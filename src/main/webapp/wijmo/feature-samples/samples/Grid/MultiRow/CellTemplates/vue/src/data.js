import { CollectionView } from '@grapecity/wijmo';
export function getData() {
    var countries = getCountries(), data = [];
    for (var i = 0; i < 30; i++) {
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
    return data;
}
export function getCountries() {
    return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
}
export function getCv() {
    return new CollectionView(getData(), {
        //sortDescriptions: ['date'],
        groupDescriptions: ['country']
    });
}
