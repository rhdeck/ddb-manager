[@raydeck/ddb-manager](../README.md) › [Globals](../globals.md) › [queryOptions](queryoptions.md)

# Interface: queryOptions

## Hierarchy

* QueryInput

  ↳ **queryOptions**

## Index

### Properties

* [AttributesToGet](queryoptions.md#optional-attributestoget)
* [ConditionalOperator](queryoptions.md#optional-conditionaloperator)
* [ConsistentRead](queryoptions.md#optional-consistentread)
* [ExclusiveStartKey](queryoptions.md#optional-exclusivestartkey)
* [ExpressionAttributeNames](queryoptions.md#optional-expressionattributenames)
* [ExpressionAttributeValues](queryoptions.md#optional-expressionattributevalues)
* [FilterExpression](queryoptions.md#optional-filterexpression)
* [IndexName](queryoptions.md#optional-indexname)
* [KeyConditionExpression](queryoptions.md#optional-keyconditionexpression)
* [KeyConditions](queryoptions.md#optional-keyconditions)
* [Limit](queryoptions.md#optional-limit)
* [ProjectionExpression](queryoptions.md#optional-projectionexpression)
* [QueryFilter](queryoptions.md#optional-queryfilter)
* [ReturnConsumedCapacity](queryoptions.md#optional-returnconsumedcapacity)
* [ScanIndexForward](queryoptions.md#optional-scanindexforward)
* [Select](queryoptions.md#optional-select)
* [TableName](queryoptions.md#tablename)
* [limit](queryoptions.md#optional-limit)
* [tableName](queryoptions.md#optional-tablename)

## Properties

### `Optional` AttributesToGet

• **AttributesToGet**? : *AttributeNameList*

*Inherited from [queryOptions](queryoptions.md).[AttributesToGet](queryoptions.md#optional-attributestoget)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1645

This is a legacy parameter. Use ProjectionExpression instead. For more information, see AttributesToGet in the Amazon DynamoDB Developer Guide.

___

### `Optional` ConditionalOperator

• **ConditionalOperator**? : *[ConditionalOperator](queryoptions.md#optional-conditionaloperator)*

*Inherited from [queryOptions](queryoptions.md).[ConditionalOperator](queryoptions.md#optional-conditionaloperator)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1665

This is a legacy parameter. Use FilterExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide.

___

### `Optional` ConsistentRead

• **ConsistentRead**? : *[ConsistentRead](queryoptions.md#optional-consistentread)*

*Inherited from [queryOptions](queryoptions.md).[ConsistentRead](queryoptions.md#optional-consistentread)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1653

Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads. Strongly consistent reads are not supported on global secondary indexes. If you query a global secondary index with ConsistentRead set to true, you will receive a ValidationException.

___

### `Optional` ExclusiveStartKey

• **ExclusiveStartKey**? : *Key*

*Inherited from [queryOptions](queryoptions.md).[ExclusiveStartKey](queryoptions.md#optional-exclusivestartkey)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1673

The primary key of the first item that this operation will evaluate. Use the value that was returned for LastEvaluatedKey in the previous operation. The data type for ExclusiveStartKey must be String, Number, or Binary. No set data types are allowed.

___

### `Optional` ExpressionAttributeNames

• **ExpressionAttributeNames**? : *ExpressionAttributeNameMap*

*Inherited from [queryOptions](queryoptions.md).[ExpressionAttributeNames](queryoptions.md#optional-expressionattributenames)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1690

One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames:   To access an attribute whose name conflicts with a DynamoDB reserved word.   To create a placeholder for repeating occurrences of an attribute name in an expression.   To prevent special characters in an attribute name from being misinterpreted in an expression.   Use the # character in an expression to dereference an attribute name. For example, consider the following attribute name:    Percentile    The name of this attribute conflicts with a reserved word, so it cannot be used directly in an expression. (For the complete list of reserved words, see Reserved Words in the Amazon DynamoDB Developer Guide). To work around this, you could specify the following for ExpressionAttributeNames:    {"#P":"Percentile"}    You could then use this substitution in an expression, as in this example:    #P = :val     Tokens that begin with the : character are expression attribute values, which are placeholders for the actual value at runtime.  For more information on expression attribute names, see Specifying Item Attributes in the Amazon DynamoDB Developer Guide.

___

### `Optional` ExpressionAttributeValues

• **ExpressionAttributeValues**? : *ExpressionAttributeValueMap*

*Inherited from [queryOptions](queryoptions.md).[ExpressionAttributeValues](queryoptions.md#optional-expressionattributevalues)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1694

One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the value of the ProductStatus attribute was one of the following:   Available | Backordered | Discontinued  You would first need to specify ExpressionAttributeValues as follows:  { ":avail":{"S":"Available"}, ":back":{"S":"Backordered"}, ":disc":{"S":"Discontinued"} }  You could then use these values in an expression, such as this:  ProductStatus IN (:avail, :back, :disc)  For more information on expression attribute values, see Specifying Conditions in the Amazon DynamoDB Developer Guide.

___

### `Optional` FilterExpression

• **FilterExpression**? : *ConditionExpression*

*Inherited from [queryOptions](queryoptions.md).[FilterExpression](queryoptions.md#optional-filterexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1682

A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. Items that do not satisfy the FilterExpression criteria are not returned. A FilterExpression does not allow key attributes. You cannot define a filter expression based on a partition key or a sort key.  A FilterExpression is applied after the items have already been read; the process of filtering does not consume any additional read capacity units.  For more information, see Filter Expressions in the Amazon DynamoDB Developer Guide.

___

### `Optional` IndexName

• **IndexName**? : *[IndexName](queryoptions.md#optional-indexname)*

*Inherited from [queryOptions](queryoptions.md).[IndexName](queryoptions.md#optional-indexname)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1637

The name of an index to query. This index can be any local secondary index or global secondary index on the table. Note that if you use the IndexName parameter, you must also provide TableName.

___

### `Optional` KeyConditionExpression

• **KeyConditionExpression**? : *KeyExpression*

*Inherited from [queryOptions](queryoptions.md).[KeyConditionExpression](queryoptions.md#optional-keyconditionexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1686

The condition that specifies the key values for items to be retrieved by the Query action. The condition must perform an equality test on a single partition key value. The condition can optionally perform one of several comparison tests on a single sort key value. This allows Query to retrieve one item with a given partition key value and sort key value, or several items that have the same partition key value but different sort key values. The partition key equality test is required, and must be specified in the following format:  partitionKeyName = :partitionkeyval  If you also want to provide a condition for the sort key, it must be combined using AND with the condition for the sort key. Following is an example, using the = comparison operator for the sort key:  partitionKeyName = :partitionkeyval AND sortKeyName = :sortkeyval  Valid comparisons for the sort key condition are as follows:    sortKeyName = :sortkeyval - true if the sort key value is equal to :sortkeyval.    sortKeyName &lt; :sortkeyval - true if the sort key value is less than :sortkeyval.    sortKeyName &lt;= :sortkeyval - true if the sort key value is less than or equal to :sortkeyval.    sortKeyName &gt; :sortkeyval - true if the sort key value is greater than :sortkeyval.    sortKeyName &gt;=  :sortkeyval - true if the sort key value is greater than or equal to :sortkeyval.    sortKeyName BETWEEN :sortkeyval1 AND :sortkeyval2 - true if the sort key value is greater than or equal to :sortkeyval1, and less than or equal to :sortkeyval2.    begins_with ( sortKeyName, :sortkeyval ) - true if the sort key value begins with a particular operand. (You cannot use this function with a sort key that is of type Number.) Note that the function name begins_with is case-sensitive.   Use the ExpressionAttributeValues parameter to replace tokens such as :partitionval and :sortval with actual values at runtime. You can optionally use the ExpressionAttributeNames parameter to replace the names of the partition key and sort key with placeholder tokens. This option might be necessary if an attribute name conflicts with a DynamoDB reserved word. For example, the following KeyConditionExpression parameter causes an error because Size is a reserved word:    Size = :myval    To work around this, define a placeholder (such a #S) to represent the attribute name Size. KeyConditionExpression then is as follows:    #S = :myval    For a list of reserved words, see Reserved Words in the Amazon DynamoDB Developer Guide. For more information on ExpressionAttributeNames and ExpressionAttributeValues, see Using Placeholders for Attribute Names and Values in the Amazon DynamoDB Developer Guide.

___

### `Optional` KeyConditions

• **KeyConditions**? : *[KeyConditions](queryoptions.md#optional-keyconditions)*

*Inherited from [queryOptions](queryoptions.md).[KeyConditions](queryoptions.md#optional-keyconditions)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1657

This is a legacy parameter. Use KeyConditionExpression instead. For more information, see KeyConditions in the Amazon DynamoDB Developer Guide.

___

### `Optional` Limit

• **Limit**? : *PositiveIntegerObject*

*Inherited from [queryOptions](queryoptions.md).[Limit](queryoptions.md#optional-limit)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1649

The maximum number of items to evaluate (not necessarily the number of matching items). If DynamoDB processes the number of items up to the limit while processing the results, it stops the operation and returns the matching values up to that point, and a key in LastEvaluatedKey to apply in a subsequent operation, so that you can pick up where you left off. Also, if the processed dataset size exceeds 1 MB before DynamoDB reaches this limit, it stops the operation and returns the matching values up to the limit, and a key in LastEvaluatedKey to apply in a subsequent operation to continue the operation. For more information, see Query and Scan in the Amazon DynamoDB Developer Guide.

___

### `Optional` ProjectionExpression

• **ProjectionExpression**? : *[ProjectionExpression](queryoptions.md#optional-projectionexpression)*

*Inherited from [queryOptions](queryoptions.md).[ProjectionExpression](queryoptions.md#optional-projectionexpression)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1678

A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the expression must be separated by commas. If no attribute names are specified, then all attributes will be returned. If any of the requested attributes are not found, they will not appear in the result. For more information, see Accessing Item Attributes in the Amazon DynamoDB Developer Guide.

___

### `Optional` QueryFilter

• **QueryFilter**? : *FilterConditionMap*

*Inherited from [queryOptions](queryoptions.md).[QueryFilter](queryoptions.md#optional-queryfilter)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1661

This is a legacy parameter. Use FilterExpression instead. For more information, see QueryFilter in the Amazon DynamoDB Developer Guide.

___

### `Optional` ReturnConsumedCapacity

• **ReturnConsumedCapacity**? : *[ReturnConsumedCapacity](queryoptions.md#optional-returnconsumedcapacity)*

*Inherited from [queryOptions](queryoptions.md).[ReturnConsumedCapacity](queryoptions.md#optional-returnconsumedcapacity)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1674

___

### `Optional` ScanIndexForward

• **ScanIndexForward**? : *BooleanObject*

*Inherited from [queryOptions](queryoptions.md).[ScanIndexForward](queryoptions.md#optional-scanindexforward)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1669

Specifies the order for index traversal: If true (default), the traversal is performed in ascending order; if false, the traversal is performed in descending order.  Items with the same partition key value are stored in sorted order by sort key. If the sort key data type is Number, the results are stored in numeric order. For type String, the results are stored in order of UTF-8 bytes. For type Binary, DynamoDB treats each byte of the binary data as unsigned. If ScanIndexForward is true, DynamoDB returns the results in the order in which they are stored (by sort key value). This is the default behavior. If ScanIndexForward is false, DynamoDB reads the results in reverse order by sort key value, and then returns the results to the client.

___

### `Optional` Select

• **Select**? : *[Select](queryoptions.md#optional-select)*

*Inherited from [queryOptions](queryoptions.md).[Select](queryoptions.md#optional-select)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1641

The attributes to be returned in the result. You can retrieve all item attributes, specific item attributes, the count of matching items, or in the case of an index, some or all of the attributes projected into the index.    ALL_ATTRIBUTES - Returns all of the item attributes from the specified table or index. If you query a local secondary index, then for each matching item in the index, DynamoDB fetches the entire item from the parent table. If the index is configured to project all item attributes, then all of the data can be obtained from the local secondary index, and no fetching is required.    ALL_PROJECTED_ATTRIBUTES - Allowed only when querying an index. Retrieves all attributes that have been projected into the index. If the index is configured to project all attributes, this return value is equivalent to specifying ALL_ATTRIBUTES.    COUNT - Returns the number of matching items, rather than the matching items themselves.    SPECIFIC_ATTRIBUTES - Returns only the attributes listed in AttributesToGet. This return value is equivalent to specifying AttributesToGet without specifying any value for Select. If you query or scan a local secondary index and request only attributes that are projected into that index, the operation will read only the index and not the table. If any of the requested attributes are not projected into the local secondary index, DynamoDB fetches each of these attributes from the parent table. This extra fetching incurs additional throughput cost and latency. If you query or scan a global secondary index, you can only request attributes that are projected into the index. Global secondary index queries cannot fetch attributes from the parent table.   If neither Select nor AttributesToGet are specified, DynamoDB defaults to ALL_ATTRIBUTES when accessing a table, and ALL_PROJECTED_ATTRIBUTES when accessing an index. You cannot use both Select and AttributesToGet together in a single request, unless the value for Select is SPECIFIC_ATTRIBUTES. (This usage is equivalent to specifying AttributesToGet without any value for Select.)  If you use the ProjectionExpression parameter, then the value for Select can only be SPECIFIC_ATTRIBUTES. Any other value for Select will return an error.

___

###  TableName

• **TableName**: *[TableName](queryoptions.md#tablename)*

*Inherited from [queryOptions](queryoptions.md).[TableName](queryoptions.md#tablename)*

Defined in node_modules/aws-sdk/lib/dynamodb/document_client.d.ts:1633

The name of the table containing the requested items.

___

### `Optional` limit

• **limit**? : *number*

*Defined in [src/index.ts:7](https://github.com/rhdeck/ddb-manager/blob/d625ce8/src/index.ts#L7)*

___

### `Optional` tableName

• **tableName**? : *string*

*Defined in [src/index.ts:6](https://github.com/rhdeck/ddb-manager/blob/d625ce8/src/index.ts#L6)*
