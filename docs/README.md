[@raydeck/ddb-manager - v2.1.5](README.md)

# @raydeck/ddb-manager - v2.1.5

## Index

### Classes

* [DDBHandler](classes/ddbhandler.md)

### Interfaces

* [queryOptions](interfaces/queryoptions.md)

### Type aliases

* [filterFunc](README.md#filterfunc)

### Variables

* [savedDDB](README.md#let-savedddb)

### Functions

* [ddb](README.md#const-ddb)
* [hashMap](README.md#const-hashmap)
* [hashReduce](README.md#const-hashreduce)
* [queryAll](README.md#const-queryall)
* [queryCount](README.md#const-querycount)
* [queryMap](README.md#const-querymap)
* [queryMapSerial](README.md#const-querymapserial)
* [queryPage](README.md#const-querypage)
* [queryReduce](README.md#const-queryreduce)
* [scanAll](README.md#const-scanall)
* [scanMap](README.md#const-scanmap)
* [scanMapSerial](README.md#const-scanmapserial)
* [scanPage](README.md#const-scanpage)
* [secondaryIndexMap](README.md#const-secondaryindexmap)
* [setDDB](README.md#const-setddb)
* [withHash](README.md#const-withhash)
* [withSecondaryIndex](README.md#const-withsecondaryindex)

## Type aliases

###  filterFunc

Ƭ **filterFunc**: *function*

*Defined in [src/index.ts:4](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L4)*

#### Type declaration:

▸ (`arg`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | any |

## Variables

### `Let` savedDDB

• **savedDDB**: *DocumentClient | undefined*

*Defined in [src/index.ts:9](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L9)*

## Functions

### `Const` ddb

▸ **ddb**(): *DocumentClient‹›*

*Defined in [src/index.ts:13](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L13)*

**Returns:** *DocumentClient‹›*

___

### `Const` hashMap

▸ **hashMap**‹**T**›(`hashKey`: string, `hashValue`: DynamoDB.DocumentClient.Key, `TableName`: string, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:157](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L157)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashKey**: *string*

▪ **hashValue**: *DynamoDB.DocumentClient.Key*

▪ **TableName**: *string*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` hashReduce

▸ **hashReduce**‹**T**›(`hashKey`: string, `hashValue`: DynamoDB.DocumentClient.Key, `TableName`: string, `f`: function, `start`: T, `limit`: number): *Promise‹T›*

*Defined in [src/index.ts:165](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L165)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashKey**: *string*

▪ **hashValue**: *DynamoDB.DocumentClient.Key*

▪ **TableName**: *string*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

▪ **start**: *T*

▪`Default value`  **limit**: *number*= 0

**Returns:** *Promise‹T›*

___

### `Const` queryAll

▸ **queryAll**(`params`: QueryInput): *Promise‹object[]›*

*Defined in [src/index.ts:217](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | QueryInput |

**Returns:** *Promise‹object[]›*

___

### `Const` queryCount

▸ **queryCount**(`params`: QueryInput): *Promise‹number›*

*Defined in [src/index.ts:204](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | QueryInput |

**Returns:** *Promise‹number›*

___

### `Const` queryMap

▸ **queryMap**‹**T**›(`o`: [queryOptions](interfaces/queryoptions.md), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:91](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L91)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](interfaces/queryoptions.md)*

▪ **f**: *function*

▸ (`item`: object): *Promise‹T› | T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` queryMapSerial

▸ **queryMapSerial**‹**T**›(`o`: [queryOptions](interfaces/queryoptions.md), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:105](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L105)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](interfaces/queryoptions.md)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` queryPage

▸ **queryPage**(`TableNameOrOptions`: [queryOptions](interfaces/queryoptions.md), `lastKey?`: DynamoDB.DocumentClient.Key | string | undefined): *Promise‹[object[], string]›*

*Defined in [src/index.ts:73](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`TableNameOrOptions` | [queryOptions](interfaces/queryoptions.md) |
`lastKey?` | DynamoDB.DocumentClient.Key &#124; string &#124; undefined |

**Returns:** *Promise‹[object[], string]›*

___

### `Const` queryReduce

▸ **queryReduce**‹**T**›(`params`: QueryInput, `f`: function, `start`: T, `limit`: number): *Promise‹T›*

*Defined in [src/index.ts:122](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L122)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **params**: *QueryInput*

▪ **f**: *function*

▸ (`previousValue`: T, `currentValue`: object, `currentIndex`: number, `array`: object[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | T |
`currentValue` | object |
`currentIndex` | number |
`array` | object[] |

▪ **start**: *T*

▪`Default value`  **limit**: *number*= 0

**Returns:** *Promise‹T›*

___

### `Const` scanAll

▸ **scanAll**(`params`: [queryOptions](interfaces/queryoptions.md)): *Promise‹object[]›*

*Defined in [src/index.ts:19](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [queryOptions](interfaces/queryoptions.md) |

**Returns:** *Promise‹object[]›*

___

### `Const` scanMap

▸ **scanMap**‹**T**›(`o`: [queryOptions](interfaces/queryoptions.md), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:24](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L24)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](interfaces/queryoptions.md)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` scanMapSerial

▸ **scanMapSerial**‹**T**›(`o`: [queryOptions](interfaces/queryoptions.md), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:38](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L38)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](interfaces/queryoptions.md)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` scanPage

▸ **scanPage**(`o`: [queryOptions](interfaces/queryoptions.md), `lastKey?`: string | DynamoDB.DocumentClient.Key | undefined): *Promise‹[object[], string]›*

*Defined in [src/index.ts:55](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [queryOptions](interfaces/queryoptions.md) |
`lastKey?` | string &#124; DynamoDB.DocumentClient.Key &#124; undefined |

**Returns:** *Promise‹[object[], string]›*

___

### `Const` secondaryIndexMap

▸ **secondaryIndexMap**‹**T**›(`key`: string, `value`: any, `indexName`: string, `TableName`: string, `f`: function, `limit`: number): *Promise‹T[]›*

*Defined in [src/index.ts:193](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L193)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **key**: *string*

▪ **value**: *any*

▪ **indexName**: *string*

▪ **TableName**: *string*

▪ **f**: *function*

▸ (`item`: object): *Promise‹T› | T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

▪`Default value`  **limit**: *number*= 0

**Returns:** *Promise‹T[]›*

___

### `Const` setDDB

▸ **setDDB**(`newDDB`: DocumentClient): *void*

*Defined in [src/index.ts:10](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`newDDB` | DocumentClient |

**Returns:** *void*

___

### `Const` withHash

▸ **withHash**(`hashKey`: string, `hashValue`: DynamoDB.DocumentClient.Key): *object*

*Defined in [src/index.ts:143](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`hashKey` | string |
`hashValue` | DynamoDB.DocumentClient.Key |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

### `Const` withSecondaryIndex

▸ **withSecondaryIndex**(`key`: string, `value`: any, `IndexName`: string): *object*

*Defined in [src/index.ts:180](https://github.com/rhdeck/ddb-manager/blob/c73ea1b/src/index.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |
`IndexName` | string |

**Returns:** *object*

* **IndexName**: *string*

* **KeyConditionExpression**: *string* = "#key=:value"

* ### **ExpressionAttributeNames**: *object*

  * **#key**: *string* = key

* ### **ExpressionAttributeValues**: *object*

  * **:value**: *any* = value
