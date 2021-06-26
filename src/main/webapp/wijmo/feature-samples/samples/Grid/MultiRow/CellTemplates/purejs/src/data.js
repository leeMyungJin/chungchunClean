import * as wjcCore from '@grapecity/wijmo';
//
export function getData() {
    let countries = getCountries(), data = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            id: i,
            date: new Date(2015, Math.floor(i / countries.length) % 12, (Math.floor(i / countries.length) + 1) % 28),
            country: countries[i % countries.length],
            countryMapped: i % countries.length,
            downloads: Math.round(Math.random() * 20000),
            sales: Math.round(Math.random() * 10000 * 100) / 100,
            expenses: Math.random() * 5000,
            checked: i % 9 == 0
        });
    }
    return new wjcCore.CollectionView(data, {
        groupDescriptions: ['country']
    });
}
//
export function getCountries() {
    return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
}
