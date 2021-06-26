Calculated Fields
=================

The **CollectionView** allows you to add calculated fields to your data sources.

This is done by setting the **calculatedFields** property to a value that contains
the names of the calculated fields and functions used to get the field values.

The functions may be specified as regular JavaScript functions that take the current
data item as argument or as string expressions with an "$" value that represents the 
current data item.

Calculated fields are read-only and are automatically updated their dependent fields
change.

**Note**: To use calculated fields in IE11, you must include a proxy polyfill such as
https://www.npmjs.com/package/proxy-polyfill. 
