Stable Sort
===========

The __CollectionView__ class has a **useStableSort** property that allows you to 
keep the original sequence of items when sorting by any fields in the data objects.
This sample creates a __CollectionView__ based on a list of items sorted by
_Country_ and _ID_. If you sort the grid by any property (e.g. Active), items with
the same sort property value will be sorted according to the original order 
(sorted by Country and ID).

Most modern browsers provide stable sorting by default (since Chrome 70 and Firefox 3),
so the **useStableSort** property does not make a difference except in IE and Edge.
