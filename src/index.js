import { DynamoDB } from "aws-sdk";
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
  constructor(tableName) {
    this.tableName = tableName;
    this.cachedValues = {};
  }
  setId(id) {
    this.id = typeof id === "object" ? id : { id };
  }
  async set(key, value) {
    return this._update({ [key]: value });
  }
  async setValues(o) {
    return this._update(o);
  }
  processUpdates(updates) {
    const processedUpdates = Object.entries(updates).filter(
      ([field, _]) => !Object.keys(this.id).includes(field)
    );
    this.cachedValues = processedUpdates.reduce(
      (o, [key, value]) => ({ ...o, [key]: value }),
      this.cachedValues && {}
    );
    return processedUpdates;
  }
  async _update(updates) {
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    const updateStatements = [];
    this.processUpdates(updates).forEach(([field, value]) => {
      if (value === "") value = null;
      ExpressionAttributeNames[`#${field}`] = field;
      ExpressionAttributeValues[`:${field}`] = value;
      updateStatements.push(`#${field} = :${field}`);
    });
    if (updateStatements.length) {
      const UpdateExpression = `SET ${updateStatements.join(",")}`;
      const updateParams = {
        TableName: this.tableName,
        Key: this.id,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        UpdateExpression
      };
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
      Key: key ? key : this.getPrimaryKey()
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
  async secondaryIndexMap(key, value, indexName, f) {
    return secondaryIndexMap(key, value, indexName, this.tableName, f);
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
  DDBHandler
};
