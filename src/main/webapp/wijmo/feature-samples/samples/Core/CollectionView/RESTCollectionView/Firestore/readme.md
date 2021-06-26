RestCollectionView Firestore
============================

This sample shows how you can extend the **RestCollectionView** class to 
create a custom **RestCollectionViewFirestore** class that talks to
[Firestore](https://firebase.google.com/docs/firestore) sources.

The **RestCollectionViewFirestore** class is similar to the **wijmo.cloud.Collection** 
class that ships with Wijmo. It supports CRUD operations as well as
server-based sorting, filtering, and pagination.

Note that Firestore does not provide a total item count, so we can't calculate
how many pages are available. For this reason, the **CollectionViewNavigator** in
this sample shows only the current page and not the total count.

Also note that Firestore filtering is subject to certain limitations.
Certain filter conditions are not supported ("contains", "does not contain",
and "ends with"). Also, certain conditions may require additional indexes
to be built, and some may conflict with server-side sorting.
For these reasons, you may prefer to apply filters only on the client, or
set server-side filters using custom code rather than using the **FlexGridFilter** 
class.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) |
[Loading Data Documentation](https://www.grapecity.com/wijmo/docs/Topics/Wijmo/Collections/Loading-Data) |
[CollectionView API Reference](https://www.grapecity.com/wijmo/api/classes/wijmo.collectionview.html)