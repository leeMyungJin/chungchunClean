export function getData() {
    let data = [], buyers = 'Mom,Dad,Kelly,Bob'.split(','), types = 'Fuel,Food,Sports,Books,Music,Tickets'.split(','), yr = new Date().getFullYear();
    for (let i = 0; i < 1000; i++) {
        data.push({
            date: new Date(yr, -Math.random() * 36),
            buyer: pickOne(buyers),
            type: pickOne(types),
            amount: Math.round(Math.random() * 500 + 10)
        });
    }
    return data;
}
function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
