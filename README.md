
<a name="readmemd"></a>

[@raydeck/ddb-manager - v3.0.0](#readmemd)

# @raydeck/ddb-manager - v3.0.0

## Index

### Classes

* [DDBHandler](#classesddbhandlermd)

### Functions

* [queryPage](#querypage)
* [setDDB](#setddb)

## Functions

###  queryPage

▸ **queryPage**(`__namedParameters`: object, `lastKey?`: string): *Promise‹[object[], string | undefined]›*

*Defined in [index.ts:37](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L37)*

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

###  setDDB

▸ **setDDB**(`newDDB`: DocumentClient): *void*

*Defined in [index.ts:13](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L13)*

Set new instance of DynamoDB for ddb-manager to use

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newDDB` | DocumentClient | Instance of DynamoDB  |

**Returns:** *void*


<a name="classesddbhandlermd"></a>

[@raydeck/ddb-manager - v3.0.0](#readmemd) › [DDBHandler](#classesddbhandlermd)

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
* [processUpdates](#protected-processupdates)
* [set](#set)
* [setId](#setid)
* [setValues](#setvalues)

## Constructors

###  constructor

\+ **new DDBHandler**(`tableName`: string, `hashKey`: string): *[DDBHandler](#classesddbhandlermd)*

*Defined in [index.ts:102](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L102)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](#classesddbhandlermd)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [index.ts:90](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L90)*

Item partition key name

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [index.ts:86](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L86)*

Item attributes

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [index.ts:98](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L98)*

Flag that indicates whether item saved persistently. If true, item exists in dynamoDB table; if false, item does not exist in dynamoDB table

___

###  id

• **id**: *object*

*Defined in [index.ts:94](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L94)*

Item primary key

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [index.ts:102](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L102)*

Flag that indicates where item data comes from. If true, data was passed via loadFromItem; if false, data was loaded directly from dynamoDB table

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [index.ts:82](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L82)*

DynamoDB table item lives in

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [index.ts:230](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L230)*

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

*Defined in [index.ts:177](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L177)*

Update attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Object of attribute key/value pairs  |

**Returns:** *Promise‹this›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [index.ts:302](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L302)*

Delete item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key?` | string &#124; object | Primary key of item to delete  |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [index.ts:259](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L259)*

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

*Defined in [index.ts:266](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L266)*

Check if attribute exists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute  |

**Returns:** *boolean*

___

###  hashKey

▸ **hashKey**(): *string*

*Defined in [index.ts:119](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L119)*

Return partition key name

**Returns:** *string*

___

###  hashPage

▸ **hashPage**(`hashValue`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [index.ts:315](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L315)*

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

*Defined in [index.ts:332](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L332)*

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

*Defined in [index.ts:273](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L273)*

Initialize instance from dynamoDB item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`o` | any | Item primary key  |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: object): *this*

*Defined in [index.ts:292](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L292)*

Initialize instance from a plain old javascript object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Item` | object |   |

**Returns:** *this*

___

### `Protected` processUpdates

▸ **processUpdates**(`updates`: object): *[string, any][]*

*Defined in [index.ts:145](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L145)*

Transform an updates object to an array of tuples.

Updates are saved locally only. Item in dynamoDB table will not be updated by this function

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Updates to item attributes   |

**Returns:** *[string, any][]*

___

###  set

▸ **set**(`key`: string, `value`: any): *Promise‹void›*

*Defined in [index.ts:127](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L127)*

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

*Defined in [index.ts:113](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L113)*

Set id (primary key) of an item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string &#124; object | Item primary key Id should be an object for a composite primary key  |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`mapOfValues`: object): *Promise‹void›*

*Defined in [index.ts:134](https://github.com/rhdeck/ddb-manager/blob/6e131ac/src/index.ts#L134)*

Set multiple attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mapOfValues` | object | Object of attribute key/value pairs (e.g. `{attribute1: "value1", attribute2: false}`)  |

**Returns:** *Promise‹void›*
