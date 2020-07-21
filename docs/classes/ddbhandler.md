[@raydeck/ddb-manager - v2.1.6](../README.md) › [DDBHandler](ddbhandler.md)

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

*Defined in [src/index.ts:226](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L226)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`tableName` | string | - |
`hashKey` | string | "id" |

**Returns:** *[DDBHandler](ddbhandler.md)*

## Properties

### `Protected` _hashKey

• **_hashKey**: *string*

*Defined in [src/index.ts:223](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L223)*

___

###  cachedValues

• **cachedValues**: *object*

*Defined in [src/index.ts:222](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L222)*

#### Type declaration:

* \[ **key**: *string*\]: any

___

###  exists

• **exists**: *boolean* = false

*Defined in [src/index.ts:225](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L225)*

___

###  id

• **id**: *object*

*Defined in [src/index.ts:224](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L224)*

#### Type declaration:

___

###  loaded

• **loaded**: *boolean* = false

*Defined in [src/index.ts:226](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L226)*

___

### `Protected` tableName

• **tableName**: *string*

*Defined in [src/index.ts:221](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L221)*

## Methods

###  _create

▸ **_create**(`o`: object, `id`: any, `options`: object): *Promise‹this›*

*Defined in [src/index.ts:316](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L316)*

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

*Defined in [src/index.ts:271](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L271)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *Promise‹this›*

___

###  all

▸ **all**(): *Promise‹object[]›*

*Defined in [src/index.ts:375](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L375)*

**Returns:** *Promise‹object[]›*

___

###  delete

▸ **delete**(`key?`: string | object): *Promise‹void›*

*Defined in [src/index.ts:367](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`key?` | string &#124; object |

**Returns:** *Promise‹void›*

___

###  get

▸ **get**‹**T**›(`key`: string, `def?`: T): *T | undefined*

*Defined in [src/index.ts:340](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L340)*

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

*Defined in [src/index.ts:343](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L343)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  hashFind

▸ **hashFind**(`hashValue`: any, `f`: function): *Promise‹object›*

*Defined in [src/index.ts:428](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L428)*

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

*Defined in [src/index.ts:234](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L234)*

**Returns:** *string*

___

###  hashMap

▸ **hashMap**‹**T**›(`hashValue`: any, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:384](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L384)*

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

*Defined in [src/index.ts:405](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L405)*

**Parameters:**

Name | Type |
------ | ------ |
`hashValue` | any |
`lastValue?` | string |

**Returns:** *Promise‹[object[], string]›*

___

###  hashReduce

▸ **hashReduce**‹**T**›(`hashValue`: any, `f`: function, `start`: T): *Promise‹T›*

*Defined in [src/index.ts:390](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L390)*

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

*Defined in [src/index.ts:440](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L440)*

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

*Defined in [src/index.ts:444](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L444)*

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

*Defined in [src/index.ts:414](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L414)*

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

*Defined in [src/index.ts:463](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L463)*

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

*Defined in [src/index.ts:346](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L346)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | any |

**Returns:** *Promise‹this›*

___

###  loadFromItem

▸ **loadFromItem**(`Item`: object): *this*

*Defined in [src/index.ts:361](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L361)*

**Parameters:**

Name | Type |
------ | ------ |
`Item` | object |

**Returns:** *this*

___

###  map

▸ **map**‹**T**›(`f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:378](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L378)*

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

*Defined in [src/index.ts:381](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L381)*

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

*Defined in [src/index.ts:243](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L243)*

**Parameters:**

Name | Type |
------ | ------ |
`updates` | object |

**Returns:** *[string, any][]*

___

###  secondaryIndexMap

▸ **secondaryIndexMap**‹**T**›(`key`: string, `value`: any, `indexName`: string, `f`: function): *Promise‹T[]›*

*Defined in [src/index.ts:397](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L397)*

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

*Defined in [src/index.ts:237](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L237)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | any |

**Returns:** *Promise‹void›*

___

###  setId

▸ **setId**(`id`: string | object): *void*

*Defined in [src/index.ts:231](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L231)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string &#124; object |

**Returns:** *void*

___

###  setValues

▸ **setValues**(`o`: object): *Promise‹void›*

*Defined in [src/index.ts:240](https://github.com/rhdeck/ddb-manager/blob/3b93ff1/src/index.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | object |

**Returns:** *Promise‹void›*
