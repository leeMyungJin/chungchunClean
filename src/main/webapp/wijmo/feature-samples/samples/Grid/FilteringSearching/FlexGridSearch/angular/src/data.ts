// generate some random data
export function getData() {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), products = 'Phones,Computers,Cars,Stereos'.split(','), colors = 'Red,Green,Blue,Black,White,Yellow'.split(','), data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: pickOne(countries),
            product: pickOne(products),
            color: pickOne(colors),
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
        });
    }
    return data;
}
function pickOne(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
