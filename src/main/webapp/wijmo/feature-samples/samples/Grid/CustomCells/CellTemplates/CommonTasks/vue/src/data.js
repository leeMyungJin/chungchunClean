import { DataMap } from '@grapecity/wijmo.grid';
import { DateTime } from '@grapecity/wijmo';

export function getCountries() {
    return [
        { id: 0, name: 'US', flag: 'us' },
        { id: 1, name: 'Germany', flag: 'de' },
        { id: 2, name: 'UK', flag: 'gb' },
        { id: 3, name: 'Japan', flag: 'jp' },
        { id: 4, name: 'Italy', flag: 'it' },
        { id: 5, name: 'France', flag: 'fr' },
        { id: 6, name: 'Canada', flag: 'ca' },
        { id: 7, name: 'Russia', flag: 'ru' }
    ]
}
export function getCountryMap() {
    return new DataMap(getCountries(), 'id', 'name');
}
export function getProducts() {
    return 'Cars,Computers,Phones,Movies,Books'.split(',');
}
export function getColors() {
    return 'Red,Green,Blue,White,Black,Yellow,Orange'.split(',');
}
export function getData(cnt) {
    let countries = getCountries(),
        products = getProducts(),
        colors = getColors(),
        today = new Date(),
        data = [];
    for (let i = 0; i < cnt; i++) {
        data.push({
            id: i,
            date: DateTime.addDays(today, -i),
            product: pickOne(products),
            country: pickOne(countries).id,
            color: pickOne(colors),
            value: 500 + Math.round(Math.random() * 1000),
            change: Math.round((Math.random() - 0.45) * 10000) / 10000
        });
    }
    return data;
}
function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}