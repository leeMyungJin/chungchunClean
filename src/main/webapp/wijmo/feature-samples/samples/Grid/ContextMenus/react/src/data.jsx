export function getData(cnt) {
    let countries = 'US,Germany,UK,Japan'.split(',');
    let data = [];
    for (var i = 0; i < cnt; i++) {
        data.push({
            id: i,
            date: new Date(Date.now() - Math.random() * 10 * 24 * 3600 * 1000),
            country: countries[i % countries.length],
            active: Math.random() < .5,
            sales: Math.random() * 1000,
            expenses: Math.random() * 500
        });
    }
    return data;
}
