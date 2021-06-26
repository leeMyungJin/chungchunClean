'use strict';
export let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
export let products = ['Widget', 'Gadget', 'Doohickey'];
export let colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
// data used to generate random items
export function getData(count) {
    let data = [], ordinalCountry = count <= countries.length;
    for (let i = 0; i < count; i++) {
        data.push({
            id: i,
            country: countries[ordinalCountry ? i : i % countries.length],
            date: new Date(2014, i % 12, i % 28),
            downloads: Math.round(Math.random() * 10000),
            sales: Math.random() * 10000,
            active: i % 4 == 0
        });
    }
    return data;
}
export function getData2(count) {
    let data = [], dt = new Date();
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
        // create the item
        let item = {
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            amount: Math.random() * 10000 - 5000,
            active: i % 4 === 0,
        };
        // add the item to the list
        data.push(item);
    }
    return data;
}
