import { DynamoDB } from "aws-sdk";
import { createHash } from "crypto";
import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
type filterFunc = (arg: any) => boolean;
interface queryOptions extends DynamoDB.DocumentClient.QueryInput {
  tableName?: string;
  limit?: number;
}
let savedDDB: DynamoDB.DocumentClient | undefined;
const setDDB = (newDDB: DynamoDB.DocumentClient) => {
  savedDDB = newDDB;
};
const ddb = () => {
  if (!savedDDB) {
    savedDDB = new DynamoDB.DocumentClient();
  }
  return savedDDB;
};
const scanAll = async (
  params: queryOptions
): Promise<DynamoDB.DocumentClient.AttributeMap[]> => {
  return await scanMap(params, (o) => o);
};
const scanMap = async <T>(
  o: queryOptions,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T
): Promise<T[]> => {
  let lastKey: DynamoDB.DocumentClient.Key;
  let out: T[] = [];
  do {
    const [arr, temp] = await scanPage(o, lastKey);
    out = [...out, ...(await Promise.all(arr.map(f)))];
    if (o.limit && arr.length > o.limit - 1) break;
    lastKey = temp;
  } while (lastKey);
  return out;
};
const scanMapSerial = async <T>(
  o: queryOptions,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T
): Promise<T[]> => {
  let lastKey: DynamoDB.DocumentClient.Key;
  let out: any[] = [];
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
const scanPage = async (
  o: queryOptions,
  lastKey?: DynamoDB.DocumentClient.Key
): Promise<[DynamoDB.DocumentClient.ItemList, DynamoDB.DocumentClient.Key]> => {
  const { tableName, limit: l = 0, ...rest } = o;
  const TableName = tableName ? tableName : rest.TableName;
  const limit = l;
  const params = rest;
  let { Items, LastEvaluatedKey } = await ddb()
    .scan({ ExclusiveStartKey: lastKey, TableName, ...params })
    .promise();
  if (limit && Items.length > limit - 1) return [Items, undefined];
  return [Items, LastEvaluatedKey];
};
const queryPage = async (
  TableNameOrOptions: queryOptions,
  lastKey?: DynamoDB.DocumentClient.Key
): Promise<[DynamoDB.DocumentClient.ItemList, DynamoDB.DocumentClient.Key]> => {
  const { tableName, limit: l = 0, ...rest } = TableNameOrOptions;
  const TableName = tableName ? tableName : rest.TableName;
  const limit = l;
  const params = rest;
  let { Items, LastEvaluatedKey } = await ddb()
    .query({ ExclusiveStartKey: lastKey, TableName, ...params })
    .promise();
  if (limit && Items.length > limit - 1) return [Items, undefined];
  return [Items, LastEvaluatedKey];
};
const queryMap = async <T>(
  o: queryOptions,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T
) => {
  let lastKey: DynamoDB.DocumentClient.Key;
  let out: T[] = [];
  do {
    const [arr, temp] = await queryPage(o, lastKey);
    out = [...out, ...(await Promise.all(arr.map(f)))];
    if (o.limit && arr.length > o.limit - 1) break;
    lastKey = temp;
  } while (lastKey);
  return out;
};
const queryMapSerial = async <T>(
  o: queryOptions,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T
) => {
  let lastKey: DynamoDB.DocumentClient.Key;
  let out: T[] = [];
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
const queryReduce = async <T>(
  params: DynamoDB.DocumentClient.QueryInput,
  f: (
    previousValue: T,
    currentValue: DynamoDB.DocumentClient.AttributeMap,
    currentIndex: number,
    array: DynamoDB.DocumentClient.ItemList
  ) => T,
  start: T,
  limit: number = 0
): Promise<T> => {
  let results = await ddb()
    .query({ ...params })
    .promise();
  const out = results.Items.reduce(f, start);
  if (results.LastEvaluatedKey) {
    params.ExclusiveStartKey = results.LastEvaluatedKey;
    return queryReduce(params, f, out, limit && limit - results.Items.length);
  }
  return out;
};
const withHash = (
  hashKey: string,
  hashValue: DynamoDB.DocumentClient.Key
): { [key: string]: any } => {
  const params = {
    KeyConditions: {
      [hashKey]: {
        ComparisonOperator: "EQ",
        AttributeValueList: [hashValue],
      },
    },
  };
  return params;
};
const hashMap = async <T>(
  hashKey: string,
  hashValue: DynamoDB.DocumentClient.Key,
  TableName: string,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T
) => {
  return queryMap({ ...withHash(hashKey, hashValue), TableName }, f);
};
const hashReduce = async <T>(
  hashKey: string,
  hashValue: DynamoDB.DocumentClient.Key,
  TableName: string,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T,
  start: T,
  limit: number = 0
) => {
  return queryReduce<T>(
    { ...withHash(hashKey, hashValue), TableName },
    f,
    start,
    limit
  );
};
const withSecondaryIndex = (key: string, value: any, IndexName: string) => {
  const params = {
    KeyConditionExpression: "#key=:value",
    ExpressionAttributeNames: {
      "#key": key,
    },
    ExpressionAttributeValues: {
      ":value": value,
    },
    IndexName,
  };
  return params;
};
const secondaryIndexMap = async <T>(
  key: string,
  value: any,
  indexName: string,
  TableName: string,
  f: (item: DynamoDB.DocumentClient.AttributeMap) => T,
  limit = 0
) => {
  const p = { ...withSecondaryIndex(key, value, indexName), TableName };
  return queryMap<T>(p, f);
};
const queryCount = async (
  params: DynamoDB.DocumentClient.QueryInput
): Promise<number> => {
  params.Select = "COUNT";
  let { Count, LastEvaluatedKey } = await ddb()
    .query({ ...params })
    .promise();
  if (LastEvaluatedKey) {
    params.ExclusiveStartKey = LastEvaluatedKey;
    return Count + (await queryCount(params));
  }
  return Count;
};
const queryAll = async (
  params: DynamoDB.DocumentClient.QueryInput
): Promise<DynamoDB.DocumentClient.AttributeMap[]> =>
  queryMap(params, (item) => item);
class DDBHandler {
  protected tableName: string;
  protected cachedValues: { [key: string]: any } = {};
  protected _hashKey: string;
  protected id: {};
  protected exists: boolean = false;
  protected loaded: boolean = false;
  constructor(tableName: string, hashKey: string = "id") {
    this.tableName = tableName;
    this._hashKey = hashKey;
  }
  setId(id: string | {}) {
    this.id = typeof id === "object" ? id : { id };
  }
  hashKey() {
    return this._hashKey || Object.keys(this.id)[0];
  }
  async set(key: string, value: any) {
    await this._update({ [key]: value });
  }
  async setValues(o: { [key: string]: any }) {
    await this._update(o);
  }
  protected processUpdates(updates: { [key: string]: any }) {
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
        keys.forEach((key) => {
          val = val[key];
        });
        val[lastKey] = value;
        return { ...o, [topKey]: topValue };
      }
      return { ...o, [key]: value };
    }, this.cachedValues || {});
    return processedUpdates;
  }
  protected async _update(updates: { [key: string]: any }) {
    const ExpressionAttributeNames: DynamoDB.DocumentClient.ExpressionAttributeNameMap = {};
    const ExpressionAttributeValues: DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};
    const updateStatements: string[] = [];
    this.processUpdates(updates).forEach(([field, value]) => {
      if (value === "") value = null;
      if (field.includes(".")) {
        const md5sum = createHash("md5");
        md5sum.update(field);
        const normalizedValueVariable = `:${md5sum.digest("hex")}`;
        ExpressionAttributeValues[normalizedValueVariable] = value;
        const normalizedNameVariable = field
          .split(".")
          .map((part) => {
            const newPart = `#${createHash("md5").update(part).digest("hex")}`;
            ExpressionAttributeNames[newPart] = part;
            return newPart;
          })
          .join(".");
        updateStatements.push(
          `${normalizedNameVariable} = ${normalizedValueVariable}`
        );
      } else {
        const newPart = `${createHash("md5").update(field).digest("hex")}`;
        updateStatements.push(`#${newPart} = :${newPart}`);
        ExpressionAttributeNames[`#${newPart}`] = field;
        ExpressionAttributeValues[`:${newPart}`] = value;
      }
    });
    if (updateStatements.length) {
      const UpdateExpression = `SET ${updateStatements.join(",")}`;
      const updateParams: UpdateItemInput = {
        TableName: this.tableName,
        Key: this.id,
        UpdateExpression,
        ExpressionAttributeValues,
      };
      if (Object.keys(ExpressionAttributeNames).length) {
        updateParams.ExpressionAttributeNames = ExpressionAttributeNames;
      }
      if (!(await ddb().update(updateParams).promise()))
        throw "Failed to update";
    }
    return this;
  }
  protected async _create(
    o: { [key: string]: any },
    id: any,
    options: { [key: string]: any } = {}
  ) {
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
      Item,
      ...options,
    };
    await ddb().put(params).promise();
    await this.loadFromItem(Item);
    return this;
  }
  get<T>(key: string, def?: T): T | undefined {
    return this.has(key) ? this.cachedValues[key] : def;
  }
  has(key: string) {
    return typeof this.cachedValues[key] !== "undefined";
  }
  async load(o: any) {
    if (o) this.setId(o);
    const params = { TableName: this.tableName, Key: this.id };
    let { Item } = await ddb().get(params).promise();
    if (!Item) {
      console.warn("Error in loading item from DDB with params", { params });
      throw new Error(
        "Item  does not exist in ddb id:" +
          JSON.stringify(this.id) +
          " table: " +
          this.tableName
      );
    }
    return this.loadFromItem(Item);
  }
  loadFromItem(Item: DynamoDB.DocumentClient.AttributeMap) {
    this.cachedValues = { ...Item };
    this.exists = typeof Item != "undefined";
    this.loaded = true;
    return this;
  }
  async delete(key?: string) {
    const params = {
      TableName: this.tableName,
      Key: key ? key : this.id,
    };
    await ddb().delete(params).promise();
    return this;
  }
  async all() {
    return scanAll({ TableName: this.tableName });
  }
  async map<T>(
    f: (item: DynamoDB.DocumentClient.AttributeMap) => T
  ): Promise<T[]> {
    return scanMap({ TableName: this.tableName }, f);
  }
  async mapSerial<T>(
    f: (item: DynamoDB.DocumentClient.AttributeMap) => T
  ): Promise<T[]> {
    return scanMapSerial({ TableName: this.tableName }, f);
  }
  async hashMap<T>(
    hashValue: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => T
  ): Promise<T[]> {
    return hashMap(this.hashKey(), hashValue, this.tableName, f);
  }
  async hashReduce<T>(
    hashValue: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => T,
    start: T
  ): Promise<T> {
    return hashReduce(this.hashKey(), hashValue, this.tableName, f, start);
  }
  async secondaryIndexMap<T>(
    key: string,
    value: any,
    indexName: string,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => T
  ): Promise<T[]> {
    return secondaryIndexMap(key, value, indexName, this.tableName, f);
  }
  async hashPage(hashValue: any, lastValue?: any) {
    return queryPage(
      {
        TableName: this.tableName,
        ...withHash(this.hashKey(), hashValue),
      },
      lastValue
    );
  }
  async indexPage(indexName: string, key: string, value: any, lastValue?: any) {
    return queryPage(
      {
        ...withSecondaryIndex(key, value, indexName),
        TableName: this.tableName,
      },
      lastValue
    );
  }
  async hashFind(
    hashValue: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => boolean
  ): Promise<DynamoDB.DocumentClient.AttributeMap> {
    let temp: DynamoDB.DocumentClient.Key;
    do {
      const [items, lastIndex] = await this.hashPage(hashValue, temp);
      for (const i of items) if (f(i)) return i;
      temp = lastIndex;
    } while (temp);
    return null;
  }
  async hashSome(
    hashValue: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => boolean
  ) {
    const item = await this.hashFind(hashValue, f);
    return item !== null;
  }
  async indexFind(
    indexName: string,
    key: string,
    value: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => boolean
  ) {
    let temp: DynamoDB.DocumentClient.Key;
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
  async indexSome(
    indexName: string,
    key: string,
    value: any,
    f: (item: DynamoDB.DocumentClient.AttributeMap) => boolean
  ) {
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
  queryPage,
  setDDB,
};
