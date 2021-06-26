// data sources
export function getData() {
    let arr = [], cnt = 50, a = Math.random(), b = Math.random();
    //
    for (let i = 1; i < cnt; i++) {
        arr.push({
            x: i,
            y: a + i * b + i * Math.random()
        });
    }
    //
    return arr;
}
