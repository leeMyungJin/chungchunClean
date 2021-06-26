// key - config (folder) name
// value - display name
var frameworkMap = {
  "": "",
  "purejs": "JavaScript", 
  "angular": "Angular", 
  "react": "React", 
  "react-redux": "React Redux",
  "vue3": "Vue 3",
  "vue": "Vue"
}

var data = [
    // {
    //   path:  `AllWebComponents`,
    //   name: "AllWebComponents",
    //   image: `images/AllWebComponents.png`,
    //   title: "All Web Components",
    //   description: `Reprehenderit minim fugiat et nostrud cillum qui nisi ullamco ex est laborum laborum 
    //   enim tempor. Nulla officia tempor Lorem tempor irure non.`,
    //   framework: ["Web Components"],
    //   longDescription:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet neque vulputate,
    //   placerat mauris aliquam, elementum tortor. Quisque vehicula, dui aliquet lacinia iaculis, ante massa
    //   dictum ex, a gravida ex metus et lacus. Integer finibus varius fermentum. Phasellus id urna id
    //   mauris tristique pellentesque sed ut dolor. Cras tincidunt fringilla libero nec dictum. Mauris
    //   blandit, neque quis scelerisque accumsan, leo dui sodales magna, porta tincidunt turpis purus vel
    //   purus. Duis condimentum nibh eu dapibus porta. Aenean eleifend eros non dui malesuada aliquam. Nam
    //   erat lectus, suscipit ac suscipit vitae, placerat ut lorem.`
    // },
    {
      path: `CryptoCurrencyTracking`,
      name: "CryptoCurrencyTracking",
      image: `images/CryptoCurrencyTracking.png`,
      title: "Crypto Currency Tracking",
      description: `Demonstrates how to use Wijmo's React interop in the React/Redux application.`,
      framework: ["react-redux"],
      longDescription:`The sample demonstrates how to use Wijmo's React interop in the React/Redux application. It implements a crypto currency tracking dashboard using React and Redux.`
    },
    {
      path: `GeoDashboard`,
      name: "GeoDashboard",
      image: `images/GeoDashboard.png`,
      title: "Geo Dashboard",
      description: `An interactive geographic dashboard for analyzing demographic data.`,
      framework: ["angular", "react", "vue"],
      longDescription:`The sample creates a service that connects ArcGIS online to get several 
information sources via the Extent object. Changing the Extent causes 
the service to update the information using ArcGIS online.

The information is displayed in tiles bound to the ViewModel. Clicking
a tile will display a corresponding layer on the map.
      
The sample allows you to search for locations by name (using Google's
geocoding services), or to go to your current location (using
HTML5 location services available in most modern browsers).

The framework versions of the sample are especially interesting because
they use custom directives that wrap the Esri map. This simplifies the 
markup dramatically and makes the components re-usable within the 
application and across applications.

The sample also shows how you can use filters to perform tasks such
as converting coordinates from (x,y) to (longitude/latitude) notation.
This allows the app to display coordinates as [40°27'44"N, 80°1'24"W] 
instead of [-80.02, 40.46].
`
    },
    {
      path: `DynamicDashboard`,
      name: "DynamicDashboard",
      image: `images/DynamicDashboard.png`,
      title: "Dynamic Dashboard",
      description: `Shows how you can use Wijmo controls in dynamic, user-customizable dashboards.`,
      framework: ["angular", "purejs", "react", "vue", "vue3"],
      longDescription:`Shows how you can use Wijmo controls in dynamic, user-customizable dashboards.

Start by selecting a tile type, then click the button to add the new tile to the dashboard.

Use the mouse to drag tiles to new positions, or click the close button at the top-right 
corner of each tile to remove the tile from the dashboard.

The sample uses a DragDropTouch class that allows users to drag tiles using touch as
well as the mouse. The DragDropTouch class was copied from the DragDropTouch sample,
where it is documented in detail.

The tile frame and the tile contents are stored in partial views, so you can easily
create and customize new tile types.
      `
    },
    // {
    //   path:  `CustomizedComponents`,
    //   name: "CustomizedComponents",
    //   image: `images/CustomizedComponents.png`,
    //   title: "Customized Components",
    //   description: `Shows how to customize Wijmo components using different techniques like inheritance and aggregation.`,
    //   framework: ["angular"],
    //   longDescription:`Shows how to customize Wijmo components using different techniques like inheritance and aggregation.`
    // },
    {
      path:  `AllComponents`,
      name: "AllComponents",
      image: `images/AllComponents.png`,
      title: "All Components",
      description: `Shows how to get started with all components in Wijmo's interop modules.`,
      framework: ["vue3"],
      longDescription:`The sample shows how to use Wijmo's interop components. It demonstrates the basic usage scenarios for the most of the core Wijmo components.`
    },
    // {
    //   path: `WebComponentsIntro`,
    //   name: "WebComponentsIntro",
    //   image: `images/WebComponentsIntro.png`,
    //   title: "WebComponents Intro",
    //   description: `Reprehenderit minim fugiat et nostrud cillum qui nisi ullamco ex est laborum laborum 
    //   enim tempor. Nulla officia tempor Lorem tempor irure non.`,
    //   framework: ["Web Components"],
    //   longDescription:`Mauris vestibulum convallis nisl vitae gravida. Pellentesque faucibus, mi id tincidunt pharetra, nibh eros gravida dolor, quis tristique mi elit ac diam. Integer molestie congue urna, ut rhoncus erat vestibulum quis. In et leo eu ex tristique scelerisque. Ut vulputate ultricies urna sit amet mattis. Vestibulum suscipit accumsan libero, ac congue erat ultricies in. Nullam ac tellus auctor velit molestie vehicula. Aenean eget tincidunt ante, mattis maximus ex. Nullam a nisi facilisis, vulputate velit at, pulvinar odio. Aliquam in lacus a ex tempor laoreet nec quis dolor. In imperdiet lorem ipsum, ac ullamcorper quam pellentesque tristique.`
    // },
]


module.exports = {
    data: data,
    frameworkMap
}