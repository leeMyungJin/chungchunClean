export function getData() {
    // create some random data
    let countries = "US,Germany,UK,Japan,Italy,Greece".split(","), data = [];
    for (let i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            rating: Math.round(Math.random() * 5),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    return data;
}
