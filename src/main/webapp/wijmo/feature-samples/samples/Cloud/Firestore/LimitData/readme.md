Limit Data
==========

[Firebase](https://firebase.google.com/docs/firestore/data-model#collections) collections may contain huge amounts of data.
Narrowing down and getting only the data you need makes applications
more efficient and less expensive (cloud services are not always free).

There are three simple ways to limit the amount of data loaded into 
[Collection](https://www.grapecity.com/wijmo/api/classes/wijmo_cloud.collection.html) objects:

- Use the [fields](https://www.grapecity.com/wijmo/api/classes/wijmo_cloud.collection.html#fields) property to specify the fields you want to load.
- Set the [pageSize](https://www.grapecity.com/wijmo/api/classes/wijmo_cloud.collection.html#pagesize) property to a reasonable number of records set the [pageOnServer](https://www.grapecity.com/wijmo/api/classes/wijmo_cloud.collection.html#pageonserver) property to true.
- Set the **queryFilter** property to an object that describes a filter to apply to the data.

This sample demonstrates all of these techniques.

[Learn about FlexGrid](https://www.grapecity.com/wijmo/flexgrid-javascript-data-grid) | [Limit Data Documentation](https://www.grapecity.com/wijmo/docs/Topics/Cloud/Firestore/Limit-Data) | [Cloud API Reference](https://www.grapecity.com/wijmo/api/modules/wijmo_cloud.html)