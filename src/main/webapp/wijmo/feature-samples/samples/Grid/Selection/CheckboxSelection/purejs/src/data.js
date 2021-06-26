export function getData(count) {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Widgets,Gadgets,Yahoos'.split(','), data = [];
    for (var i = 0; i < count; i++) {
        var item = {
            id: i,
            country: pickOne(countries),
            product: pickOne(products),
            discount: Math.random() * .3,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        };
        data.push(item);
    }
    return data;
}
function pickOne(items) {
    return items[randBetween(0, items.length - 1)];
}
function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
