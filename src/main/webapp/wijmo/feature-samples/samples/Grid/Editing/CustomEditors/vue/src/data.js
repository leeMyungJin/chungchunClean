export function getData() {
    var data = [],
        countries = getCountries(),
        products = getProducts(),
        dt = new Date(),
        yr = dt.getFullYear();
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i,
            date: new Date(yr, i % 12, 25, i % 24, i % 60, i % 60),
            time: new Date(yr, i % 12, 25, i % 24, i % 60, i % 60),
            country: pickOne(countries),
            productId: pickOne(products).id,
            color: pickOne('Red,Green,Blue,Yellow,Pink,Orange,Gold'.split(',')),
            amount: Math.random() * 10000,
            discount: Math.random() / 4,
            premium: Math.random() > .8
        });
    }
    return data;
}
export function getCountries() {
    return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
}
export function getProducts() {
    let p = 'Andy Capp\'s fries,Barcel,Brannigans,Bugles,Cape Cod Potato Chips,Cheese Flavoured Moments,' +
        'Cheetos,Cheez Doodles,Cheez-It,Cheezies,CornNuts,David Sunflower Seeds,Doritos,Frazzles,Frito-Lay,' +
        'Fritos,Golden Wonder,Hula Hoops,Kettle Foods,KP Nuts,Kurkure,Lay\'s Stax,McCoys Crisps,' +
        'Monster Munch,Munchos,Nobby\'s Nuts,Phileas Fogg,Pirate\'s Booty,Pringles,Ringos,Ruffles,' +
        'Salt\'n\' Shake,San Nicasio,Space Raiders,Sun Chips,Smith\'s Crisps,Tudor Crisps,Twiglets,' +
        'Twisties,Tyrrells,Tyrrells Apple Chips,Walkers Crisps,Wheat Crunchies,Wise Foods,Wotsits';
    return p.split(',').map((name, id) => {
        return { id: id, name: name };
    });
}
function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
