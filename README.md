
<a name="readmemd"></a>

[@raydeck/ddb-manager - v3.3.2](#readmemd)

# @raydeck/ddb-manager - v3.3.2

## Index

### Classes

* [DDBError](#classesddberrormd)
* [DDBHandler](#classesddbhandlermd)

### Functions

* [pageMap](#pagemap)
* [queryPage](#querypage)
* [scanPage](#scanpage)
* [setDDB](#setddb)

## Functions

###  pageMap

▸ **pageMap**‹**T**, **R**›(`paginator`: function, `f`: function): *Promise‹R[]›*

*Defined in [src/index.ts:121](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L121)*

Iterate through all pages of a function as generic

**`example`** 
```ts
const numbers = await pageMap(
(l) => Number_page(account, l),
async (number) => number.getId()
);
```

**Type parameters:**

▪ **T**

Type of objects the paginator returns

▪ **R**

Type of return value (defaults to void)

**Parameters:**

▪ **paginator**: *function*

Function that returns a page as [object[], lastKey] tuple (like queryPage)

▸ (`l?`: string): *Promise‹[T[], string | undefined]›*

**Parameters:**

Name | Type |
------ | ------ |
`l?` | string |

▪ **f**: *function*

Map function - takes output of queryPage and returns a value

▸ (`arg`: T): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | T |

**Returns:** *Promise‹R[]›*

___

###  queryPage

▸ **queryPage**(`__namedParameters`: object, `lastKey?`: string): *Promise‹[object[], string | undefined]›*

*Defined in [src/index.ts:43](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L43)*

Run paginated query on dynamoDB table

**Parameters:**

▪ **__namedParameters**: *object*

Query options

Name | Type | Default |
------ | ------ | ------ |
`IndexName` | string | - |
`Key` | string | - |
`Limit` | number | 50 |
`TableName` | string | - |
`Value` | string &#124; number | - |
`isReversed` | boolean | false |

▪`Optional`  **lastKey**: *string*

Specifies where to start query. Undefined returned when no more items found

**Returns:** *Promise‹[object[], string | undefined]›*

___

###  scanPage

▸ **scanPage**(`__namedParameters`: object, `lastKey?`: string): *Promise‹[object[], string | undefined]›*

*Defined in [src/index.ts:87](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L87)*

Iterate through whole table - returns only the fields specified

**Parameters:**

▪ **__namedParameters**: *object*

Scan options

Name | Type |
------ | ------ |
`TableName` | string |
`fields` | string[] |

▪`Optional`  **lastKey**: *string*

**Returns:** *Promise‹[object[], string | undefined]›*

___

###  setDDB

▸ **setDDB**(`newDDB`: DocumentClient): *void*

*Defined in [src/index.ts:13](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L13)*

Set new instance of DynamoDB for ddb-manager to use

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newDDB` | DocumentClient | Instance of DynamoDB  |

**Returns:** *void*


<a name="classesddberrormd"></a>

[@raydeck/ddb-manager - v3.3.2](#readmemd) › [DDBError](#classesddberrormd)

# Class: DDBError

Class for high-level DDBManager errors that can include the original raw DDB/AWS error

## Hierarchy

* [Error](#static-error)

  ↳ **DDBError**

## Index

### Properties

* [message](#message)
* [name](#name)
* [rawError](#optional-rawerror)
* [stack](#optional-stack)
* [Error](#static-error)

## Properties

###  message

• **message**: *string*

*Inherited from [DDBError](#classesddberrormd).[message](#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [DDBError](#classesddberrormd).[name](#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` rawError

• **rawError**? : *[Error](#static-error)*

*Defined in [src/index.ts:20](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L20)*

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [DDBError](#classesddberrormd).[stack](#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984


<a name="classesddbhandlermd"></a>

[@raydeck/ddb-manager - v3.3.2](#readmemd) › [DDBHandler](#classesddbhandlermd)

# Class: DDBHandler

Manager to handle CRUD operations on a dynamoDB item

## Hierarchy

* **DDBHandler**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [_hashKey](#protected-_hashkey)
* [cachedValues](#cachedvalues)
* [exists](#exists)
* [id](#id)
* [loaded](#loaded)
* [tableName](#protected-tablename)

### Methods

* [_create](#_create)
* [_update](#protected-_update)
* [delete](#delete)
* [get](#get)
* [has](#has)
* [hashKey](#hashkey)
* [hashPage](#hashpage)
* [indexPage](#indexpage)
* [load](#load)
* [loadFromItem](#loadfromitem)
* [processRemoves](#protected-processremoves)
* [processUpdates](#protected-processupdates)
* [remove](#remove)
* [set](#set)
* [setId](#setid)
* [setValues](#setvalues)

## Constructors

###  constructor

\+ **new DDBHandler**(`tableName`: string, `hashKey`: string): *[DDBHandler](#classesddbhandlermd)*

*Defined in [src/index.ts:163](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L163)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](#classesddbhandlermd)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [src/index.ts:151](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L151)*

Item partition key name

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [src/index.ts:147](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L147)*

Item attributes

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [src/index.ts:159](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L159)*

Flag that indicates whether item saved persistently. If true, item exists in dynamoDB table; if false, item does not exist in dynamoDB table

___

###  id

• **id**: *object*

*Defined in [src/index.ts:155](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L155)*

Item primary key

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [src/index.ts:163](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L163)*

Flag that indicates where item data comes from. If true, data was passed via loadFromItem; if false, data was loaded directly from dynamoDB table

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [src/index.ts:143](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L143)*

DynamoDB table item lives in

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [src/index.ts:378](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L378)*

Create new dynamoDB Item

If item with primary key already exists, that item will be replaced

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`o` | object | - | Shape of item |
`id` | any | - | Items primary key |
`options` | object | {} | Options for dynamoDB put operation  |

**Returns:** *Promise‹this›*

___

### `Protected` _update

▸ **_update**(`updates`: object): *Promise‹this›*

*Defined in [src/index.ts:325](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L325)*

Update attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Object of attribute key/value pairs  |

**Returns:** *Promise‹this›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [src/index.ts:474](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L474)*

Delete item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key?` | string &#124; object | Primary key of item to delete  |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [src/index.ts:432](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L432)*

Get attribute

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute |
`def?` | T | Default value for attribute  |

**Returns:** *T | undefined*

___

###  has

▸ **has**(`key`: string): *boolean*

*Defined in [src/index.ts:439](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L439)*

Check if attribute exists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute  |

**Returns:** *boolean*

___

###  hashKey

▸ **hashKey**(): *string*

*Defined in [src/index.ts:180](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L180)*

Return partition key name

**Returns:** *string*

___

###  hashPage

▸ **hashPage**(`hashValue`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:487](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L487)*

Run paginated query against partition key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hashValue` | any | Value of items partition key |
`lastValue?` | string | Specifies where to start query. Undefined returned when no more items found  |

**Returns:** *Promise‹[object[], string]›*

___

###  indexPage

▸ **indexPage**(`indexName`: string, `key`: string, `value`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:504](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L504)*

Run paginated query against global or secondary index

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`indexName` | string | Name of global or secondary index |
`key` | string | Partition (or sort) key to search against |
`value` | any | Value an items "Key" should have |
`lastValue?` | string | - |

**Returns:** *Promise‹[object[], string]›*

___

###  load

▸ **load**(`o`: any): *Promise‹this›*

*Defined in [src/index.ts:446](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L446)*

Initialize instance from dynamoDB item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`o` | any | Item primary key  |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: object): *this*

*Defined in [src/index.ts:464](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L464)*

Initialize instance from a plain old javascript object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Item` | object |   |

**Returns:** *this*

___

### `Protected` processRemoves

▸ **processRemoves**(`keys`: string[]): *string[]*

*Defined in [src/index.ts:249](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L249)*

Transform an removes object to an array of tuples.

Updates are saved locally only. Item in dynamoDB table will not be updated by this function

**Parameters:**

Name | Type |
------ | ------ |
`keys` | string[] |

**Returns:** *string[]*

___

### `Protected` processUpdates

▸ **processUpdates**(`updates`: object): *[string, any][]*

*Defined in [src/index.ts:213](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L213)*

Transform an updates object to an array of tuples.

Updates are saved locally only. Item in dynamoDB table will not be updated by this function

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Updates to item attributes   |

**Returns:** *[string, any][]*

___

###  remove

▸ **remove**(`key`: string): *Promise‹void›*

*Defined in [src/index.ts:195](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L195)*

Remove attribute from a record

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute  |

**Returns:** *Promise‹void›*

___

###  set

▸ **set**(`key`: string, `value`: any): *Promise‹void›*

*Defined in [src/index.ts:188](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L188)*

Set attribute

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute |
`value` | any | Value of attribute  |

**Returns:** *Promise‹void›*

___

###  setId

▸ **setId**(`id`: string | object): *void*

*Defined in [src/index.ts:174](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L174)*

Set id (primary key) of an item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string &#124; object | Item primary key Id should be an object for a composite primary key  |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`mapOfValues`: object): *Promise‹void›*

*Defined in [src/index.ts:202](https://github.com/rhdeck/ddb-manager/blob/e080ebc/src/index.ts#L202)*

Set multiple attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mapOfValues` | object | Object of attribute key/value pairs (e.g. `{attribute1: "value1", attribute2: false}`)  |

**Returns:** *Promise‹void›*
