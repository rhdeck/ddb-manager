[@raydeck/ddb-manager](../README.md) › [Globals](../globals.md) › [DDBHandler](ddbhandler.md)

# Class: DDBHandler

## Hierarchy

* **DDBHandler**

## Index

### Constructors

* [constructor](ddbhandler.md#constructor)

### Properties

* [_hashKey](ddbhandler.md#protected-_hashkey)
* [cachedValues](ddbhandler.md#cachedvalues)
* [exists](ddbhandler.md#exists)
* [id](ddbhandler.md#id)
* [loaded](ddbhandler.md#loaded)
* [tableName](ddbhandler.md#protected-tablename)

### Methods

* [_create](ddbhandler.md#_create)
* [_update](ddbhandler.md#protected-_update)
* [all](ddbhandler.md#all)
* [delete](ddbhandler.md#delete)
* [get](ddbhandler.md#get)
* [has](ddbhandler.md#has)
* [hashFind](ddbhandler.md#hashfind)
* [hashKey](ddbhandler.md#hashkey)
* [hashMap](ddbhandler.md#hashmap)
* [hashPage](ddbhandler.md#hashpage)
* [hashReduce](ddbhandler.md#hashreduce)
* [hashSome](ddbhandler.md#hashsome)
* [indexFind](ddbhandler.md#indexfind)
* [indexPage](ddbhandler.md#indexpage)
* [indexSome](ddbhandler.md#indexsome)
* [load](ddbhandler.md#load)
* [loadFromItem](ddbhandler.md#loadfromitem)
* [map](ddbhandler.md#map)
* [mapSerial](ddbhandler.md#mapserial)
* [processUpdates](ddbhandler.md#protected-processupdates)
* [secondaryIndexMap](ddbhandler.md#secondaryindexmap)
* [set](ddbhandler.md#set)
* [setId](ddbhandler.md#setid)
* [setValues](ddbhandler.md#setvalues)

## Constructors

###  constructor

\+ **new DDBHandler**(`tableName`: string, `hashKey`: string): *[DDBHandler](ddbhandler.md)*

*Defined in [src/index.ts:227](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L227)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](ddbhandler.md)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [src/index.ts:224](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L224)*

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [src/index.ts:223](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L223)*

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [src/index.ts:226](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L226)*

___

###  id

• **id**: *object*

*Defined in [src/index.ts:225](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L225)*

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [src/index.ts:227](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L227)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [src/index.ts:222](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L222)*

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [src/index.ts:317](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L317)*

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

*Defined in [src/index.ts:272](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L272)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *Promise‹this›*

___

###  all

▸ **all**(): *Promise‹object[]›*

*Defined in [src/index.ts:376](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L376)*

**Returns:** *Promise‹object[]›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [src/index.ts:368](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L368)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string &#124; object |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [src/index.ts:341](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L341)*

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

*Defined in [src/index.ts:344](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  hashFind

▸ **hashFind**(`hashValue`: any, `f`: function): *Promise‹DynamoDB.DocumentClient.AttributeMap›*

*Defined in [src/index.ts:433](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L433)*

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹DynamoDB.DocumentClient.AttributeMap›*

___

###  hashKey

▸ **hashKey**(): *string*

*Defined in [src/index.ts:235](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L235)*

**Returns:** *string*

___

###  hashMap

▸ **hashMap**‹**T**›(`hashValue`: any, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:389](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L389)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹T[]›*

___

###  hashPage

▸ **hashPage**(`hashValue`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:410](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L410)*

**Parameters:**

Name | Type |
------ | ------ |
`hashValue` | any |
`lastValue?` | string |

**Returns:** *Promise‹[object[], string]›*

___

###  hashReduce

▸ **hashReduce**‹**T**›(`hashValue`: any, `f`: function, `start`: T): *Promise‹T›*

*Defined in [src/index.ts:395](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L395)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

▪ **start**: *T*

**Returns:** *Promise‹T›*

___

###  hashSome

▸ **hashSome**(`hashValue`: any, `f`: function): *Promise‹boolean›*

*Defined in [src/index.ts:445](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L445)*

**Parameters:**

▪ **hashValue**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹boolean›*

___

###  indexFind

▸ **indexFind**(`indexName`: string, `key`: string, `value`: any, `f`: function): *Promise‹object›*

*Defined in [src/index.ts:452](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L452)*

**Parameters:**

▪ **indexName**: *string*

▪ **key**: *string*

▪ **value**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹object›*

___

###  indexPage

▸ **indexPage**(`indexName`: string, `key`: string, `value`: any, `lastValue?`: string): *Promise‹[object[], string]›*

*Defined in [src/index.ts:419](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L419)*

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

*Defined in [src/index.ts:471](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L471)*

**Parameters:**

▪ **indexName**: *string*

▪ **key**: *string*

▪ **value**: *any*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹boolean›*

___

###  load

▸ **load**(`o`: any): *Promise‹this›*

*Defined in [src/index.ts:347](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L347)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: DynamoDB.DocumentClient.AttributeMap): *this*

*Defined in [src/index.ts:362](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L362)*

**Parameters:**

Name | Type |
------ | ------ |
`Item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *this*

___

###  map

▸ **map**‹**T**›(`f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:379](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L379)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹T[]›*

___

###  mapSerial

▸ **mapSerial**‹**T**›(`f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:384](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L384)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹T[]›*

___

### `Protected` processUpdates

▸ **processUpdates**(`updates`: object): *[string, any][]*

*Defined in [src/index.ts:244](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *[string, any][]*

___

###  secondaryIndexMap

▸ **secondaryIndexMap**‹**T**›(`key`: string, `value`: any, `indexName`: string, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:402](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L402)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **key**: *string*

▪ **value**: *any*

▪ **indexName**: *string*

▪ **f**: *function*

▸ (`item`: DynamoDB.DocumentClient.AttributeMap): *Promise‹T› | T*

**Parameters:**

Name | Type |
------ | ------ |
`item` | DynamoDB.DocumentClient.AttributeMap |

**Returns:** *Promise‹T[]›*

___

###  set

▸ **set**(`key`: string, `value`: any): *Promise‹void›*

*Defined in [src/index.ts:238](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L238)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹void›*

___

###  setId

▸ **setId**(`id`: string | object): *void*

*Defined in [src/index.ts:232](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string &#124; object |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`o`: object): *Promise‹void›*

*Defined in [src/index.ts:241](https://github.com/rhdeck/ddb-manager/blob/a4cee92/src/index.ts#L241)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | object |

**Returns:** *Promise‹void›*
