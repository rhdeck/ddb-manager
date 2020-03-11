import { DynamoDB } from "aws-sdk";
import { createHash } from "crypto";
const ddb = new DynamoDB.DocumentClient();
const scanAll = async params => {
  return await scanMap(params, o => o);
};
const scanMap = async (o, f) => {
  let lastKey;
  let out;
  do {
    const [arr, temp] = await scanPage(o, lastKey);
    out = [...out, ...(await Promise.all(arr.map(f)))];
    if (o.limit && arr.length > o.limit - 1) break;
    lastKey = temp;
  } while (lastKey);
  return out;
};
const scanMapSerial = async (o, f) => {
  let lastKey;
  let out;
  doloop: do {
    const [arr, temp] = await scanPage(o, lastKey);
    for (const item of arr) {
      const temp = f(item);
      out.push(temp);
      if (o.limit && out.length > o.limit - 1) break doloop;
    }
    lastKey = temp;
  } while (lastKey);
  return out;
};
const scanPage = async (o, lastKey) => {
  let TableName,
    limit = 0,
    params = {};
  if (typeof o === "object") {
    const { tableName, limit: l = 0, ...rest } = o;
    TableName = tableName ? tableName : rest.TableName;
    limit = l;
    params = rest;
  } else TableName = o;
  let { Items, LastEvaluatedKey } = await ddb
    .scan({ ExclusiveStartKey: lastKey, TableName, ...params })
    .promise();
  if (limit && Items > limit - 1) return [Items];
  return [Items, LastEvaluatedKey];
};
const queryPage = async (o, lastKey) => {
  let TableName,
    limit = 0,
    params = {};
  if (typeof o === "object") {
    const { tableName, limit: l = 0, ...rest } = o;
    TableName = tableName ? tableName : rest.TableName;
    limit = l;
    params = rest;
  } else TableName = o;

  let { Items, LastEvaluatedKey } = await ddb
    .query({ ExclusiveStartKey: lastKey, TableName, ...params })
    .promise();
  if (limit && Items > limit - 1) return [Items];
  return [Items, LastEvaluatedKey];
};
const queryMap = async (o, f) => {
  let lastKey;
  let out = [];
  do {
    const [arr, temp] = await queryPage(o, lastKey);
    out = [...out, ...(await Promise.all(arr.map(f)))];
    if (o.limit && arr.length > o.limit - 1) break;
    lastKey = temp;
  } while (lastKey);
  return out;
};
const queryMapSerial = async (o, f) => {
  let lastKey;
  let out;
  doloop: do {
    const [arr, temp] = await queryPage(o, lastKey);
    for (const item of arr) {
      const temp = f(item);
      out.push(temp);
      if (o.limit && out.length > o.limit - 1) break doloop;
    }
    lastKey = temp;
  } while (lastKey);
  return out;
};
const queryReduce = async (params, f, start, limit = 0) => {
  let results = await ddb.query({ ...params }).promise();
  const out = results.Items.reduce(f, start);
  if (limit && out.length > limit - 1) return out;
  if (results.LastEvaluatedKey) {
    params.ExclusiveStartKey = results.LastEvaluatedKey;
    return queryReduce(params, f, out, limit && limit - results.Items.length);
  }
  return out;
};
const withHash = (hashKey, hashValue) => {
  const params = {
    KeyConditions: {
      [hashKey]: {
        ComparisonOperator: "EQ",
        AttributeValueList: [hashValue]
      }
    }
  };
  return params;
};
const hashMap = async (hashKey, hashValue, TableName, f, limit = 0) => {
  return queryMap({ ...withHash(hashKey, hashValue), TableName }, f, limit);
};
const hashReduce = async (
  hashKey,
  hashValue,
  TableName,
  f,
  start,
  limit = 0
) => {
  return queryReduce(
    { ...withHash(hashKey, hashValue), TableName },
    f,
    start,
    limit
  );
};
const withSecondaryIndex = (key, value, IndexName) => {
  const params = {
    KeyConditionExpression: "#key=:value",
    ExpressionAttributeNames: {
      "#key": key
    },
    ExpressionAttributeValues: {
      ":value": value
    },
    IndexName
  };
  return params;
};
const secondaryIndexMap = async (
  key,
  value,
  indexName,
  TableName,
  f,
  limit = 0
) => {
  const p = { ...withSecondaryIndex(key, value, indexName), TableName };
  return queryMap(p, f, limit);
};
const queryCount = async params => {
  params.Select = "COUNT";
  let { Count, LastEvaluatedKey } = await ddb.query({ ...params }).promise();
  if (LastEvaluatedKey) {
    params.ExclusiveStartKey = LastEvaluatedKey;
    return Count + (await queryCount(params));
  }
  return Count;
};
const queryAll = async params => queryMap(params, item => item);
class DDBHandler {
  constructor(tableName, hashKey = "id") {
    this.tableName = tableName;
    this.cachedValues = {};
    this._hashKey = hashKey;
  }
  setId(id) {
    this.id = typeof id === "object" ? id : { id };
  }
  hashKey() {
    return this._hashKey || Object.keys(this.id)[0];
  }
  async set(key, value) {
    return this._update({ [key]: value });
  }
  async setValues(o) {
    return this._update(o);
  }
  processUpdates(updates) {
    const processedUpdates = Object.entries(updates).filter(([field, _]) => {
      if (field.includes(".")) {
        field = field.split(".")[0];
      }
      return !Object.keys(this.id).includes(field);
    });
    this.cachedValues = processedUpdates.reduce((o, [key, value]) => {
      if (key.includes("[")) {
        //preventing expressions like. parent.list[index] = x
        throw new Error("Update expression with lists not supported");
      }
      if (key.includes(".")) {
        const keys = key.split(".");
        const topKey = keys.shift();
        const lastKey = keys.pop();
        const topValue = { ...o[topKey] };
        let val = topValue;
        keys.forEach(key => {
          val = val[key];
        });
        val[lastKey] = value;
        return { ...o, [topKey]: topValue };
      }
      return { ...o, [key]: value };
    }, this.cachedValues || {});
    return processedUpdates;
  }
  async _update(updates) {
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    const updateStatements = [];

    this.processUpdates(updates).forEach(([field, value]) => {
      if (value === "") value = null;
      if (field.includes(".")) {
        const md5sum = createHash("md5");
        md5sum.update(field);
        const normalizedValueVariable = `:${md5sum.digest("hex")}`;
        ExpressionAttributeValues[normalizedValueVariable] = value;
        const normalizedNameVariable = field
          .split(".")
          .map(part => {
            const newPart = `#${createHash("md5")
              .update(part)
              .digest("hex")}`;
            ExpressionAttributeNames[newPart] = part;
            return newPart;
          })
          .join(".");
        updateStatements.push(
          `${normalizedNameVariable} = ${normalizedValueVariable}`
        );
      } else {
        const newPart = `#${createHash("md5")
          .update(field)
          .digest("hex")}`;
        updateStatements.push(`#${newPart} = :${field}`);
        ExpressionAttributeNames[`#${newPart}`] = field;
        ExpressionAttributeValues[`:${newPart}`] = value;
      }
    });
    if (updateStatements.length) {
      const UpdateExpression = `SET ${updateStatements.join(",")}`;
      const updateParams = {
        TableName: this.tableName,
        Key: this.id,
        UpdateExpression,
        ExpressionAttributeValues
      };
      if (Object.keys(ExpressionAttributeNames).length) {
        updateParams.ExpressionAttributeNames = ExpressionAttributeNames;
      }
      if (!(await ddb.update(updateParams).promise())) throw "Failed to update";
    }
    return this;
  }
  async _create(o, id) {
    if (!id) id = this.id;
    else this.id = id;
    if (!id || !Object.values(id).length) {
      throw new Error("Require an id to create record");
    }
    const updates = this.processUpdates(o).reduce(
      (o, [key, value]) => ({ ...o, [key]: value }),
      {}
    );
    const Item = { ...id, ...updates };
    const params = {
      TableName: this.tableName,
      Item
    };
    await ddb.put(params).promise();
    await this.loadFromItem(Item);
    return this;
  }
  get(key, def) {
    return this.has(key) ? this.cachedValues[key] : def;
  }
  has(key) {
    return typeof this.cachedValues[key] !== "undefined";
  }
  async load(o) {
    if (o) this.setId(o);
    const params = { TableName: this.tableName, Key: this.id };
    let { Item } = await ddb.get(params).promise();
    if (!Item) {
      throw new Error("Item  does not exist in ddb", this.id, this.tableName);
    }
    return this.loadFromItem(Item);
  }
  async loadFromItem(Item) {
    this.cachedValues = { ...Item };
    this.exists = typeof Item != "undefined";
    this.loaded = true;
    return this;
  }
  async delete(key) {
    const params = {
      TableName: this.tableName,
      Key: key ? key : this.id
    };
    await ddb.delete(params).promise();
    return this;
  }
  async all() {
    return scanAll({ tableName: this.tableName });
  }
  async map(f) {
    return scanMap({ tableName: this.tableName }, f);
  }
  async mapSerial(f) {
    return scanMapSerial({ tableName: this.tableName }, f);
  }
  async hashMap(hashValue, f) {
    return hashMap(this.hashKey(), hashValue, this.tableName, f);
  }
  async hashReduce(hashValue, f, start) {
    return hashReduce(this.hashKey(), hashValue, this.tableName, f, start);
  }
  async secondaryIndexMap(key, value, indexName, f) {
    return secondaryIndexMap(key, value, indexName, this.tableName, f);
  }
  async hashPage(hashValue, lastValue) {
    return queryPage(
      {
        tableName: this.tableName,
        ...withHash(this.hashKey(), hashValue)
      },
      lastValue
    );
  }
  async indexPage(indexName, key, value, lastValue) {
    return queryPage(
      {
        ...withSecondaryIndex(key, value, indexName),
        tableName: this.tableName
      },
      lastValue
    );
  }
  async hashFind(hashValue, f) {
    let temp;
    do {
      const [items, lastIndex] = await this.hashPage(hashValue, temp);
      for (const i of items) if (f(i)) return i;
      temp = lastIndex;
    } while (temp);
    return null;
  }
  async hashSome(hashValue, f) {
    const item = await this.hashFind(hashValue, f);
    return item !== null;
  }
  async indexFind(indexName, key, value, f) {
    let temp;
    do {
      const [items, lastIndex] = await this.indexPage(
        indexName,
        key,
        value,
        temp
      );
      for (const i of items) if (f(i)) return i;
      temp = lastIndex;
    } while (temp);
    return null;
  }
  async indexSome(indexName, key, value, f) {
    const item = await this.indexFind(indexName, key, value, f);
    return item !== null;
  }
}
export {
  queryCount,
  queryAll,
  hashReduce,
  hashMap,
  queryReduce,
  queryMap,
  scanMap,
  scanAll,
  DDBHandler,
  queryPage
};
