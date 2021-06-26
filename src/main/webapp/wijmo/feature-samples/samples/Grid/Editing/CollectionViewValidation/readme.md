CollectionView-based Validation
===============================

The FlexGrid works with the [CollectionView](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html) class to provide item and collection-level validation.

To use this feature, set the CollectionView's [getError](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#geterror) property to a function that takes three
parameters (the data item being validated, the property to validate, and whether the value is being
parsed or has already been stored). The function should return a string describing the error 
or null if there are no errors.

The grid below has as data source with a [getError](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html#geterror) function that ensures the 'Sales' and 'Expenses'
properties of the items contain positive values, and provides meaningful error messages if numeric
or date cells cannot be parsed.

To see how CollectionView-based validation works, try entering negative values for 'Sales' or 'Expenses'
cells, or strings that cannot be parsed into numbers or dates into numeric/date cells:

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Collection-Based Validation Documentation](https://www.grapecity.com/wijmo/docs/Topics/Wijmo/Collections/Editing-Views#validation) | [FlexGrid API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo_grid.flexgrid.html)