
<a name="readmemd"></a>

[@raydeck/ddb-manager - v2.1.7](#readmemd)

# @raydeck/ddb-manager - v2.1.7

## Index

### Classes

* [DDBHandler](#classesddbhandlermd)

### Variables

* [savedDDB](#let-savedddb)

### Functions

* [ddb](#const-ddb)
* [queryPage](#const-querypage)
* [setDDB](#const-setddb)

## Variables

### `Let` savedDDB

• **savedDDB**: *DocumentClient | undefined*

*Defined in [index.ts:7](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L7)*

Instance of DynamoDB that will execute dynamoDB operations

## Functions

### `Const` ddb

▸ **ddb**(): *DocumentClient‹›*

*Defined in [index.ts:18](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L18)*

Returns instance of DynamoDB

**Returns:** *DocumentClient‹›*

___

### `Const` queryPage

▸ **queryPage**(`__namedParameters`: object, `lastKey?`: string): *Promise‹[object[], string]›*

*Defined in [index.ts:35](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L35)*

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

**Returns:** *Promise‹[object[], string]›*

___

### `Const` setDDB

▸ **setDDB**(`newDDB`: DocumentClient): *void*

*Defined in [index.ts:12](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L12)*

Set new instance of DynamoDB for ddb-manager to use

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`newDDB` | DocumentClient | Instance of DynamoDB  |

**Returns:** *void*


<a name="classesddbhandlermd"></a>

[@raydeck/ddb-manager - v2.1.7](#readmemd) › [DDBHandler](#classesddbhandlermd)

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

*Defined in [index.ts:103](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L103)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](#classesddbhandlermd)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [index.ts:91](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L91)*

Item partition key name

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [index.ts:87](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L87)*

Item attributes

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [index.ts:99](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L99)*

Flag that indicates whether item saved persistently. If true, item exists in dynamoDB table; if false, item does not exist in dynamoDB table

___

###  id

• **id**: *object*

*Defined in [index.ts:95](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L95)*

Item primary key

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [index.ts:103](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L103)*

Flag that indicates where item data comes from. If true, data was passed via loadFromItem; if false, data was loaded directly from dynamoDB table

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [index.ts:83](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L83)*

DynamoDB table item lives in

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [index.ts:231](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L231)*

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

*Defined in [index.ts:178](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L178)*

Update attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Object of attribute key/value pairs  |

**Returns:** *Promise‹this›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [index.ts:303](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L303)*

Delete item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key?` | string &#124; object | Primary key of item to delete  |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [index.ts:260](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L260)*

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

*Defined in [index.ts:267](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L267)*

Check if attribute exists

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of attribute  |

**Returns:** *boolean*

___

###  hashKey

▸ **hashKey**(): *string*

*Defined in [index.ts:120](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L120)*

Return partition key name

**Returns:** *string*

___

###  hashPage

▸ **hashPage**(`hashValue`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [index.ts:316](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L316)*

Run paginated query for partition key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hashValue` | any | Value of items partition key |
`lastValue?` | string | Specifies where to start query. Undefined returned when no more items found  |

**Returns:** *Promise‹[object[], string]›*

___

###  indexPage

▸ **indexPage**(`indexName`: string, `key`: string, `value`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [index.ts:333](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L333)*

Run paginated query for global or secondary index

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

*Defined in [index.ts:274](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L274)*

Initialize instance from dynamoDB item

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`o` | any | Item primary key  |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: object): *this*

*Defined in [index.ts:293](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L293)*

Initialize instance from a plain old javascript object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Item` | object |   |

**Returns:** *this*

___

### `Protected` processUpdates

▸ **processUpdates**(`updates`: object): *[string, any][]*

*Defined in [index.ts:146](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L146)*

Transform an updates object to an array of tuples.

Updates are saved locally only. Item in dynamoDB table will not be updated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updates` | object | Updates to item attributes   |

**Returns:** *[string, any][]*

___

###  set

▸ **set**(`key`: string, `value`: any): *Promise‹void›*

*Defined in [index.ts:128](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L128)*

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

*Defined in [index.ts:114](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L114)*

Set id (primary key) of an item

Id should be an object for a composite primary key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | string &#124; object | Item primary key  |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`o`: object): *Promise‹void›*

*Defined in [index.ts:135](https://github.com/IronLuffy55/ddb-manager/blob/cb8ae2e/src/index.ts#L135)*

Set multiple attributes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`o` | object | Object of attribute key/value pairs  |

**Returns:** *Promise‹void›*
