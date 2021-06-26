import { DateTime } from '@grapecity/wijmo';

export function addData(data, cnt) {
    var today = new Date(),
        buyers = 'Mom,Dad,Kelly,Sheldon'.split(','),
        types = 'Food,Clothes,Fuel,Books,Sports,Music'.split(',');
    for (var i = 0; i < cnt; i++) {
        data.push({
            date: DateTime.addYears(today, -Math.random() * 3),
            buyer: randomItem(buyers),
            type: randomItem(types),
            amount: 20 + Math.random() * 1000
        });
    }
    return data;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}