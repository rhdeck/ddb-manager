
<a name="readmemd"></a>

[@raydeck/ddb-manager - v2.1.7](#readmemd)

# @raydeck/ddb-manager - v2.1.7

## Index

### Classes

* [DDBHandler](#classesddbhandlermd)

### Interfaces

* [queryOptions](#interfacesqueryoptionsmd)

### Type aliases

* [filterFunc](#filterfunc)

### Variables

* [savedDDB](#let-savedddb)

### Functions

* [ddb](#const-ddb)
* [hashMap](#const-hashmap)
* [hashReduce](#const-hashreduce)
* [queryAll](#const-queryall)
* [queryCount](#const-querycount)
* [queryMap](#const-querymap)
* [queryMapSerial](#const-querymapserial)
* [queryPage](#const-querypage)
* [queryReduce](#const-queryreduce)
* [scanAll](#const-scanall)
* [scanMap](#const-scanmap)
* [scanMapSerial](#const-scanmapserial)
* [scanPage](#const-scanpage)
* [secondaryIndexMap](#const-secondaryindexmap)
* [setDDB](#const-setddb)
* [withHash](#const-withhash)
* [withSecondaryIndex](#const-withsecondaryindex)

## Type aliases

###  filterFunc

Ƭ **filterFunc**: *function*

*Defined in [src/index.ts:4](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L4)*

#### Type declaration:

▸ (`arg`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | any |

## Variables

### `Let` savedDDB

• **savedDDB**: *DocumentClient | undefined*

*Defined in [src/index.ts:9](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L9)*

## Functions

### `Const` ddb

▸ **ddb**(): *DocumentClient‹›*

*Defined in [src/index.ts:13](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L13)*

**Returns:** *DocumentClient‹›*

___

### `Const` hashMap

▸ **hashMap**‹**T**›(`hashKey`: string, `hashValue`: DynamoDB.DocumentClient.Key, `TableName`: string, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:157](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L157)*

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

*Defined in [src/index.ts:165](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L165)*

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

*Defined in [src/index.ts:217](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | QueryInput |

**Returns:** *Promise‹object[]›*

___

### `Const` queryCount

▸ **queryCount**(`params`: QueryInput): *Promise‹number›*

*Defined in [src/index.ts:204](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | QueryInput |

**Returns:** *Promise‹number›*

___

### `Const` queryMap

▸ **queryMap**‹**T**›(`o`: [queryOptions](#interfacesqueryoptionsmd), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:91](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L91)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](#interfacesqueryoptionsmd)*

▪ **f**: *function*

▸ (`item`: object): *Promise‹T› | T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` queryMapSerial

▸ **queryMapSerial**‹**T**›(`o`: [queryOptions](#interfacesqueryoptionsmd), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:105](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L105)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](#interfacesqueryoptionsmd)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` queryPage

▸ **queryPage**(`TableNameOrOptions`: [queryOptions](#interfacesqueryoptionsmd), `lastKey?`: DynamoDB.DocumentClient.Key | string | undefined): *Promise‹[object[], string]›*

*Defined in [src/index.ts:73](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`TableNameOrOptions` | [queryOptions](#interfacesqueryoptionsmd) |
`lastKey?` | DynamoDB.DocumentClient.Key &#124; string &#124; undefined |

**Returns:** *Promise‹[object[], string]›*

___

### `Const` queryReduce

▸ **queryReduce**‹**T**›(`params`: QueryInput, `f`: function, `start`: T, `limit`: number): *Promise‹T›*

*Defined in [src/index.ts:122](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L122)*

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

▸ **scanAll**(`params`: [queryOptions](#interfacesqueryoptionsmd)): *Promise‹object[]›*

*Defined in [src/index.ts:19](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [queryOptions](#interfacesqueryoptionsmd) |

**Returns:** *Promise‹object[]›*

___

### `Const` scanMap

▸ **scanMap**‹**T**›(`o`: [queryOptions](#interfacesqueryoptionsmd), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:24](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L24)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](#interfacesqueryoptionsmd)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` scanMapSerial

▸ **scanMapSerial**‹**T**›(`o`: [queryOptions](#interfacesqueryoptionsmd), `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:38](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L38)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **o**: *[queryOptions](#interfacesqueryoptionsmd)*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Const` scanPage

▸ **scanPage**(`o`: [queryOptions](#interfacesqueryoptionsmd), `lastKey?`: string | DynamoDB.DocumentClient.Key | undefined): *Promise‹[object[], string]›*

*Defined in [src/index.ts:55](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [queryOptions](#interfacesqueryoptionsmd) |
`lastKey?` | string &#124; DynamoDB.DocumentClient.Key &#124; undefined |

**Returns:** *Promise‹[object[], string]›*

___

### `Const` secondaryIndexMap

▸ **secondaryIndexMap**‹**T**›(`key`: string, `value`: any, `indexName`: string, `TableName`: string, `f`: function, `limit`: number): *Promise‹T[]›*

*Defined in [src/index.ts:193](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L193)*

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

*Defined in [src/index.ts:10](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`newDDB` | DocumentClient |

**Returns:** *void*

___

### `Const` withHash

▸ **withHash**(`hashKey`: string, `hashValue`: DynamoDB.DocumentClient.Key): *object*

*Defined in [src/index.ts:143](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L143)*

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

*Defined in [src/index.ts:180](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L180)*

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


<a name="classesddbhandlermd"></a>

[@raydeck/ddb-manager - v2.1.7](#readmemd) › [DDBHandler](#classesddbhandlermd)

# Class: DDBHandler

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
* [all](#all)
* [delete](#delete)
* [get](#get)
* [has](#has)
* [hashFind](#hashfind)
* [hashKey](#hashkey)
* [hashMap](#hashmap)
* [hashPage](#hashpage)
* [hashReduce](#hashreduce)
* [hashSome](#hashsome)
* [indexFind](#indexfind)
* [indexPage](#indexpage)
* [indexSome](#indexsome)
* [load](#load)
* [loadFromItem](#loadfromitem)
* [map](#map)
* [mapSerial](#mapserial)
* [processUpdates](#protected-processupdates)
* [secondaryIndexMap](#secondaryindexmap)
* [set](#set)
* [setId](#setid)
* [setValues](#setvalues)

## Constructors

###  constructor

\+ **new DDBHandler**(`tableName`: string, `hashKey`: string): *[DDBHandler](#classesddbhandlermd)*

*Defined in [src/index.ts:226](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L226)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](#classesddbhandlermd)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [src/index.ts:223](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L223)*

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [src/index.ts:222](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L222)*

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [src/index.ts:225](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L225)*

___

###  id

• **id**: *object*

*Defined in [src/index.ts:224](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L224)*

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [src/index.ts:226](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L226)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [src/index.ts:221](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L221)*

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [src/index.ts:316](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L316)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | object | - |
`id` | any | - |
`options` | object | {} |

**Returns:** *Promise‹this›*

___

### `Protected` _update

▸ **_update**(`updates`: object): *Promise‹this›*

*Defined in [src/index.ts:271](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L271)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *Promise‹this›*

___

###  all

▸ **all**(): *Promise‹object[]›*

*Defined in [src/index.ts:375](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L375)*

**Returns:** *Promise‹object[]›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [src/index.ts:367](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string &#124; object |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [src/index.ts:340](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L340)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`def?` | T |

**Returns:** *T | undefined*

___

###  has

▸ **has**(`key`: string): *boolean*

*Defined in [src/index.ts:343](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L343)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  hashFind

▸ **hashFind**(`hashValue`: any, `f`: function): *Promise‹object›*

*Defined in [src/index.ts:428](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L428)*

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: object): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹object›*

___

###  hashKey

▸ **hashKey**(): *string*

*Defined in [src/index.ts:234](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L234)*

**Returns:** *string*

___

###  hashMap

▸ **hashMap**‹**T**›(`hashValue`: any, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:384](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L384)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

###  hashPage

▸ **hashPage**(`hashValue`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:405](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L405)*

**Parameters:**

Name | Type |
------ | ------ |
`hashValue` | any |
`lastValue?` | string |

**Returns:** *Promise‹[object[], string]›*

___

###  hashReduce

▸ **hashReduce**‹**T**›(`hashValue`: any, `f`: function, `start`: T): *Promise‹T›*

*Defined in [src/index.ts:390](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L390)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

▪ **start**: *T*

**Returns:** *Promise‹T›*

___

###  hashSome

▸ **hashSome**(`hashValue`: any, `f`: function): *Promise‹boolean›*

*Defined in [src/index.ts:440](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L440)*

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: object): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹boolean›*

___

###  indexFind

▸ **indexFind**(`indexName`: string, `key`: string, `value`: any, `f`: function): *Promise‹object›*

*Defined in [src/index.ts:444](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L444)*

**Parameters:**

▪ **indexName**: *string*

▪ **key**: *string*

▪ **value**: *any*

▪ **f**: *function*

▸ (`item`: object): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹object›*

___

###  indexPage

▸ **indexPage**(`indexName`: string, `key`: string, `value`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:414](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L414)*

**Parameters:**

Name | Type |
------ | ------ |
`indexName` | string |
`key` | string |
`value` | any |
`lastValue?` | string |

**Returns:** *Promise‹[object[], string]›*

___

###  indexSome

▸ **indexSome**(`indexName`: string, `key`: string, `value`: any, `f`: function): *Promise‹boolean›*

*Defined in [src/index.ts:463](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L463)*

**Parameters:**

▪ **indexName**: *string*

▪ **key**: *string*

▪ **value**: *any*

▪ **f**: *function*

▸ (`item`: object): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹boolean›*

___

###  load

▸ **load**(`o`: any): *Promise‹this›*

*Defined in [src/index.ts:346](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L346)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: object): *this*

*Defined in [src/index.ts:361](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L361)*

**Parameters:**

Name | Type |
------ | ------ |
`Item` | object |

**Returns:** *this*

___

###  map

▸ **map**‹**T**›(`f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:378](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L378)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

###  mapSerial

▸ **mapSerial**‹**T**›(`f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:381](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L381)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (`item`: object): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

### `Protected` processUpdates

▸ **processUpdates**(`updates`: object): *[string, any][]*

*Defined in [src/index.ts:243](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L243)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *[string, any][]*

___

###  secondaryIndexMap

▸ **secondaryIndexMap**‹**T**›(`key`: string, `value`: any, `indexName`: string, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:397](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L397)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **key**: *string*

▪ **value**: *any*

▪ **indexName**: *string*

▪ **f**: *function*

▸ (`item`: object): *Promise‹T› | T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | object |

**Returns:** *Promise‹T[]›*

___

###  set

▸ **set**(`key`: string, `value`: any): *Promise‹void›*

*Defined in [src/index.ts:237](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L237)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹void›*

___

###  setId

▸ **setId**(`id`: string | object): *void*

*Defined in [src/index.ts:231](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string &#124; object |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`o`: object): *Promise‹void›*

*Defined in [src/index.ts:240](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | object |

**Returns:** *Promise‹void›*


<a name="interfacesqueryoptionsmd"></a>

[@raydeck/ddb-manager - v2.1.7](#readmemd) › [queryOptions](#interfacesqueryoptionsmd)

# Interface: queryOptions

## Hierarchy

* QueryInput

  ↳ **queryOptions**

## Index

### Properties

* [AttributesToGet](#optional-attributestoget)
* [ConditionalOperator](#optional-conditionaloperator)
* [ConsistentRead](#optional-consistentread)
* [ExclusiveStartKey](#optional-exclusivestartkey)
* [ExpressionAttributeNames](#optional-expressionattributenames)
* [ExpressionAttributeValues](#optional-expressionattributevalues)
* [FilterExpression](#optional-filterexpression)
* [IndexName](#optional-indexname)
* [KeyConditionExpression](#optional-keyconditionexpression)
* [KeyConditions](#optional-keyconditions)
* [Limit](#optional-limit)
* [ProjectionExpression](#optional-projectionexpression)
* [QueryFilter](#optional-queryfilter)
* [ReturnConsumedCapacity](#optional-returnconsumedcapacity)
* [ScanIndexForward](#optional-scanindexforward)
* [Select](#optional-select)
* [TableName](#tablename)
* [limit](#optional-limit)
* [tableName](#optional-tablename)

## Properties

### `Optional` AttributesToGet

• **AttributesToGet**? : *AttributeNameList*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[AttributesToGet](#optional-attributestoget)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1645

This is a legacy parameter. Use ProjectionExpression instead. For more information, see AttributesToGet in the Amazon DynamoDB Developer Guide.

___

### `Optional` ConditionalOperator

• **ConditionalOperator**? : *[ConditionalOperator](#optional-conditionaloperator)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ConditionalOperator](#optional-conditionaloperator)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1665

This is a legacy parameter. Use FilterExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide.

___

### `Optional` ConsistentRead

• **ConsistentRead**? : *[ConsistentRead](#optional-consistentread)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ConsistentRead](#optional-consistentread)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1653

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads. Strongly consistent reads are not supported on global secondary indexes. If you query a global secondary index with ConsistentRead set to true, you will receive a ValidationException.

___

### `Optional` ExclusiveStartKey

• **ExclusiveStartKey**? : *Key*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ExclusiveStartKey](#optional-exclusivestartkey)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1673

The primary key of the first item that this operation will evaluate. Use the value that was returned for LastEvaluatedKey in the previous operation. The data type for ExclusiveStartKey must be String, Number, or Binary. No set data types are allowed.

___

### `Optional` ExpressionAttributeNames

• **ExpressionAttributeNames**? : *ExpressionAttributeNameMap*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ExpressionAttributeNames](#optional-expressionattributenames)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1690

One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames:   To access an attribute whose name conflicts with a DynamoDB reserved word.   To create a placeholder for repeating occurrences of an attribute name in an expression.   To prevent special characters in an attribute name from being misinterpreted in an expression.   Use the # character in an expression to dereference an attribute name. For example, consider the following attribute name:    Percentile    The name of this attribute conflicts with a reserved word, so it cannot be used directly in an expression. (For the complete list of reserved words, see Reserved Words in the Amazon DynamoDB Developer Guide). To work around this, you could specify the following for ExpressionAttributeNames:    {"#P":"Percentile"}    You could then use this substitution in an expression, as in this example:    #P = :val     Tokens that begin with the : character are expression attribute values, which are placeholders for the actual value at runtime.  For more information on expression attribute names, see Specifying Item Attributes in the Amazon DynamoDB Developer Guide.

___

### `Optional` ExpressionAttributeValues

• **ExpressionAttributeValues**? : *ExpressionAttributeValueMap*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ExpressionAttributeValues](#optional-expressionattributevalues)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1694

One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the value of the ProductStatus attribute was one of the following:   Available | Backordered | Discontinued  You would first need to specify ExpressionAttributeValues as follows:  { ":avail":{"S":"Available"}, ":back":{"S":"Backordered"}, ":disc":{"S":"Discontinued"} }  You could then use these values in an expression, such as this:  ProductStatus IN (:avail, :back, :disc)  For more information on expression attribute values, see Specifying Conditions in the Amazon DynamoDB Developer Guide.

___

### `Optional` FilterExpression

• **FilterExpression**? : *ConditionExpression*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[FilterExpression](#optional-filterexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1682

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. Items that do not satisfy the FilterExpression criteria are not returned. A FilterExpression does not allow key attributes. You cannot define a filter expression based on a partition key or a sort key.  A FilterExpression is applied after the items have already been read; the process of filtering does not consume any additional read capacity units.  For more information, see Filter Expressions in the Amazon DynamoDB Developer Guide.

___

### `Optional` IndexName

• **IndexName**? : *[IndexName](#optional-indexname)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[IndexName](#optional-indexname)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1637

The name of an index to query. This index can be any local secondary index or global secondary index on the table. Note that if you use the IndexName parameter, you must also provide TableName.

___

### `Optional` KeyConditionExpression

• **KeyConditionExpression**? : *KeyExpression*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[KeyConditionExpression](#optional-keyconditionexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1686

The condition that specifies the key values for items to be retrieved by the Query action. The condition must perform an equality test on a single partition key value. The condition can optionally perform one of several comparison tests on a single sort key value. This allows Query to retrieve one item with a given partition key value and sort key value, or several items that have the same partition key value but different sort key values. The partition key equality test is required, and must be specified in the following format:  partitionKeyName = :partitionkeyval  If you also want to provide a condition for the sort key, it must be combined using AND with the condition for the sort key. Following is an example, using the = comparison operator for the sort key:  partitionKeyName = :partitionkeyval AND sortKeyName = :sortkeyval  Valid comparisons for the sort key condition are as follows:    sortKeyName = :sortkeyval - true if the sort key value is equal to :sortkeyval.    sortKeyName &lt; :sortkeyval - true if the sort key value is less than :sortkeyval.    sortKeyName &lt;= :sortkeyval - true if the sort key value is less than or equal to :sortkeyval.    sortKeyName &gt; :sortkeyval - true if the sort key value is greater than :sortkeyval.    sortKeyName &gt;=  :sortkeyval - true if the sort key value is greater than or equal to :sortkeyval.    sortKeyName BETWEEN :sortkeyval1 AND :sortkeyval2 - true if the sort key value is greater than or equal to :sortkeyval1, and less than or equal to :sortkeyval2.    begins_with ( sortKeyName, :sortkeyval ) - true if the sort key value begins with a particular operand. (You cannot use this function with a sort key that is of type Number.) Note that the function name begins_with is case-sensitive.   Use the ExpressionAttributeValues parameter to replace tokens such as :partitionval and :sortval with actual values at runtime. You can optionally use the ExpressionAttributeNames parameter to replace the names of the partition key and sort key with placeholder tokens. This option might be necessary if an attribute name conflicts with a DynamoDB reserved word. For example, the following KeyConditionExpression parameter causes an error because Size is a reserved word:    Size = :myval    To work around this, define a placeholder (such a #S) to represent the attribute name Size. KeyConditionExpression then is as follows:    #S = :myval    For a list of reserved words, see Reserved Words in the Amazon DynamoDB Developer Guide. For more information on ExpressionAttributeNames and ExpressionAttributeValues, see Using Placeholders for Attribute Names and Values in the Amazon DynamoDB Developer Guide.

___

### `Optional` KeyConditions

• **KeyConditions**? : *[KeyConditions](#optional-keyconditions)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[KeyConditions](#optional-keyconditions)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1657

This is a legacy parameter. Use KeyConditionExpression instead. For more information, see KeyConditions in the Amazon DynamoDB Developer Guide.

___

### `Optional` Limit

• **Limit**? : *PositiveIntegerObject*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[Limit](#optional-limit)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1649

The maximum number of items to evaluate (not necessarily the number of matching items). If DynamoDB processes the number of items up to the limit while processing the results, it stops the operation and returns the matching values up to that point, and a key in LastEvaluatedKey to apply in a subsequent operation, so that you can pick up where you left off. Also, if the processed dataset size exceeds 1 MB before DynamoDB reaches this limit, it stops the operation and returns the matching values up to the limit, and a key in LastEvaluatedKey to apply in a subsequent operation to continue the operation. For more information, see Query and Scan in the Amazon DynamoDB Developer Guide.

___

### `Optional` ProjectionExpression

• **ProjectionExpression**? : *[ProjectionExpression](#optional-projectionexpression)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ProjectionExpression](#optional-projectionexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1678

A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the expression must be separated by commas. If no attribute names are specified, then all attributes will be returned. If any of the requested attributes are not found, they will not appear in the result. For more information, see Accessing Item Attributes in the Amazon DynamoDB Developer Guide.

___

### `Optional` QueryFilter

• **QueryFilter**? : *FilterConditionMap*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[QueryFilter](#optional-queryfilter)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1661

This is a legacy parameter. Use FilterExpression instead. For more information, see QueryFilter in the Amazon DynamoDB Developer Guide.

___

### `Optional` ReturnConsumedCapacity

• **ReturnConsumedCapacity**? : *[ReturnConsumedCapacity](#optional-returnconsumedcapacity)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ReturnConsumedCapacity](#optional-returnconsumedcapacity)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1674

___

### `Optional` ScanIndexForward

• **ScanIndexForward**? : *BooleanObject*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[ScanIndexForward](#optional-scanindexforward)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1669

Specifies the order for index traversal: If true (default), the traversal is performed in ascending order; if false, the traversal is performed in descending order.  Items with the same partition key value are stored in sorted order by sort key. If the sort key data type is Number, the results are stored in numeric order. For type String, the results are stored in order of UTF-8 bytes. For type Binary, DynamoDB treats each byte of the binary data as unsigned. If ScanIndexForward is true, DynamoDB returns the results in the order in which they are stored (by sort key value). This is the default behavior. If ScanIndexForward is false, DynamoDB reads the results in reverse order by sort key value, and then returns the results to the client.

___

### `Optional` Select

• **Select**? : *[Select](#optional-select)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[Select](#optional-select)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1641

The attributes to be returned in the result. You can retrieve all item attributes, specific item attributes, the count of matching items, or in the case of an index, some or all of the attributes projected into the index.    ALL_ATTRIBUTES - Returns all of the item attributes from the specified table or index. If you query a local secondary index, then for each matching item in the index, DynamoDB fetches the entire item from the parent table. If the index is configured to project all item attributes, then all of the data can be obtained from the local secondary index, and no fetching is required.    ALL_PROJECTED_ATTRIBUTES - Allowed only when querying an index. Retrieves all attributes that have been projected into the index. If the index is configured to project all attributes, this return value is equivalent to specifying ALL_ATTRIBUTES.    COUNT - Returns the number of matching items, rather than the matching items themselves.    SPECIFIC_ATTRIBUTES - Returns only the attributes listed in AttributesToGet. This return value is equivalent to specifying AttributesToGet without specifying any value for Select. If you query or scan a local secondary index and request only attributes that are projected into that index, the operation will read only the index and not the table. If any of the requested attributes are not projected into the local secondary index, DynamoDB fetches each of these attributes from the parent table. This extra fetching incurs additional throughput cost and latency. If you query or scan a global secondary index, you can only request attributes that are projected into the index. Global secondary index queries cannot fetch attributes from the parent table.   If neither Select nor AttributesToGet are specified, DynamoDB defaults to ALL_ATTRIBUTES when accessing a table, and ALL_PROJECTED_ATTRIBUTES when accessing an index. You cannot use both Select and AttributesToGet together in a single request, unless the value for Select is SPECIFIC_ATTRIBUTES. (This usage is equivalent to specifying AttributesToGet without any value for Select.)  If you use the ProjectionExpression parameter, then the value for Select can only be SPECIFIC_ATTRIBUTES. Any other value for Select will return an error.

___

###  TableName

• **TableName**: *[TableName](#tablename)*

*Inherited from [queryOptions](#interfacesqueryoptionsmd).[TableName](#tablename)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1633

The name of the table containing the requested items.

___

### `Optional` limit

• **limit**? : *number*

*Defined in [src/index.ts:7](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L7)*

___

### `Optional` tableName

• **tableName**? : *string*

*Defined in [src/index.ts:6](https://github.com/rhdeck/ddb-manager/blob/47b24c4/src/index.ts#L6)*
