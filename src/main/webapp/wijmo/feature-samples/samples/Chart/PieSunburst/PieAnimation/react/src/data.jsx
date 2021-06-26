import * as wijmo from '@grapecity/wijmo';
export function getData() {
    let data = new wijmo.ObservableArray();
    //
    for (let i = 0; i < 5; i++) {
        data.push(getRandomData('random' + _getRandomValue(1000)));
    }
    //
    return data;
}
//
export function getRandomData(id) {
    return {
        id: id,
        y0: _getRandomValue(200),
        y1: _getRandomValue(400),
        y2: _getRandomValue(600),
        y3: _getRandomValue(800),
        y4: _getRandomValue(1000)
    };
}
//
function _getRandomValue(max) {
    return Math.round(Math.random() * max);
}
