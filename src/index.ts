import { DynamoDB } from "aws-sdk";
import { createHash } from "crypto";
import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
/**
 * Instance of DynamoDB that will execute dynamoDB operations
 */
let savedDDB: DynamoDB.DocumentClient | undefined;
/**
 * Set new instance of DynamoDB for ddb-manager to use
 * @param newDDB Instance of DynamoDB
 */
const setDDB = (newDDB: DynamoDB.DocumentClient) => {
  savedDDB = newDDB;
};
/**
 * Returns instance of DynamoDB
 */
const ddb = () => {
  if (!savedDDB) {
    savedDDB = new DynamoDB.DocumentClient();
  }
  return savedDDB;
};
/**
 * Run paginated query on dynamoDB table
 * @param {Object} __namedParameters Query options
 * @param {String} TableName Name of dynamoDB table to query
 * @param {String} Key Partition (or sort) key to search against
 * @param {String} Value Value an items "Key" should have
 * @param {String} IndexName Name of dynamoDB global or secondary index
 * @param {Boolean} isReversed Sort order for items. If true results are in ascending order; if false (default) results in descending order
 * @param {Int} Limit Max number of items a page should return. Default 50 items per page
 * @param lastKey Specifies where to start query. Undefined returned when no more items found
 */
const queryPage = async (
  {
    TableName,
    Key,
    Value,
    IndexName,
    isReversed = false,
    Limit = 50,
  }: {
    /**
     * blah
     */
    TableName: string;
    Key: string;
    Value: string | number;
    IndexName?: string;
    isReversed?: boolean;
    Limit?: number;
  },
  lastKey?: string
): Promise<[{ [key: string]: any }[], string]> => {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName,
    KeyConditionExpression: `#key=:value`,
    ExpressionAttributeNames: {
      "#key": Key,
    },
    ExpressionAttributeValues: {
      ":value": Value,
    },
    ScanIndexForward: !isReversed,
    Limit,
  };
  if (IndexName) params.IndexName = IndexName;
  if (lastKey) {
    params.ExclusiveStartKey = JSON.parse(lastKey);
  }
  let { Items, LastEvaluatedKey } = await ddb().query(params).promise();
  return [Items, LastEvaluatedKey && JSON.stringify(LastEvaluatedKey)];
};
/**
 * Manager to handle CRUD operations on a dynamoDB item
 *
 */
class DDBHandler {
  /**
   * DynamoDB table item lives in
   */
  protected tableName: string;
  /**
   * Item attributes
   */
  public cachedValues: { [key: string]: any } = {};
  /**
   * Item partition key name
   */
  protected _hashKey: string;
  /**
   * Item primary key
   */
  public id: {};
  /**
   * Flag that indicates whether item saved persistently. If true, item exists in dynamoDB table; if false, item does not exist in dynamoDB table
   */
  public exists: boolean = false;
  /**
   * Flag that indicates where item data comes from. If true, data was passed via loadFromItem; if false, data was loaded directly from dynamoDB table
   */
  public loaded: boolean = false;
  constructor(tableName: string, hashKey: string = "id") {
    this.tableName = tableName;
    this._hashKey = hashKey;
  }
  /**
   * Set id (primary key) of an item
   *
   * Id should be an object for a composite primary key
   * @param id Item primary key
   */
  setId(id: string | {}) {
    this.id = typeof id === "object" ? id : { id };
  }
  /**
   * Return partition key name
   */
  hashKey() {
    return this._hashKey || Object.keys(this.id)[0];
  }
  /**
   * Set attribute
   * @param key Name of attribute
   * @param value Value of attribute
   */
  async set(key: string, value: any) {
    await this._update({ [key]: value });
  }
  /**
   * Set multiple attributes
   * @param o Object of attribute key/value pairs
   */
  async setValues(o: { [key: string]: any }) {
    await this._update(o);
  }
  /**
   * Transform an updates object to an array of tuples.
   *
   * Updates are saved locally only. Item in dynamoDB table will not be updated
   *
   * @param updates Updates to item attributes
   *
   */
  protected processUpdates(updates: { [key: string]: any }): [string, any][] {
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
  /**
   * Update attributes
   * @param updates Object of attribute key/value pairs
   */
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
  /**
   * Create new dynamoDB Item
   *
   * If item with primary key already exists, that item will be replaced
   * @param o Shape of item
   * @param id Items primary key
   * @param options Options for dynamoDB put operation
   */
  async _create(
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
  /**
   * Get attribute
   * @param key Name of attribute
   * @param def Default value for attribute
   */
  get<T>(key: string, def?: T): T | undefined {
    return this.has(key) ? this.cachedValues[key] : def;
  }
  /**
   * Check if attribute exists
   * @param key Name of attribute
   */
  has(key: string) {
    return typeof this.cachedValues[key] !== "undefined";
  }
  /**
   * Initialize instance from dynamoDB item
   * @param o Item primary key
   */
  async load(o: any) {
    if (o) this.setId(o);
    const params = { TableName: this.tableName, Key: this.id };
    let { Item } = await ddb().get(params).promise();
    if (!Item) {
      // console.warn("Error in loading item from DDB with params", { params });
      throw new Error(
        "Item  does not exist in ddb id:" +
          JSON.stringify(this.id) +
          " table: " +
          this.tableName
      );
    }
    return this.loadFromItem(Item);
  }
  /**
   * Initialize instance from a plain old javascript object
   * @param Item
   */
  loadFromItem(Item: { [key: string]: any }) {
    this.cachedValues = { ...Item };
    this.exists = typeof Item != "undefined";
    this.loaded = true;
    return this;
  }
  /**
   * Delete item
   * @param key Primary key of item to delete
   */
  async delete(key?: string | { [key: string]: string }) {
    const params = {
      TableName: this.tableName,
      Key: key ? key : this.id,
    };
    await ddb().delete(params).promise();
    return;
  }
  /**
   * Run paginated query for partition key
   * @param hashValue Value of items partition key
   * @param lastValue Specifies where to start query. Undefined returned when no more items found
   */
  async hashPage(hashValue: any, lastValue?: string) {
    return queryPage(
      {
        TableName: this.tableName,
        Key: this.hashKey(),
        Value: hashValue,
      },
      lastValue
    );
  }
  /**
   * Run paginated query for global or secondary index
   * @param indexName Name of global or secondary index
   * @param key Partition (or sort) key to search against
   * @param value Value an items "Key" should have
   * @param lastValueSpecifies where to start query. Undefined returned when no more items found
   */
  async indexPage(
    indexName: string,
    key: string,
    value: any,
    lastValue?: string
  ) {
    return queryPage(
      {
        TableName: this.tableName,
        Key: key,
        Value: value,
        IndexName: indexName,
      },
      lastValue
    );
  }
}
export { DDBHandler, queryPage, setDDB };
