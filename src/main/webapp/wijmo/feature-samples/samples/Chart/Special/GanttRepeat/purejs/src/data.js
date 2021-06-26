import { DateTime } from '@grapecity/wijmo';
export function getData() {
    let data = [];
    let date = new Date();
    // add some regular tasks
    for (let i = 0; i < 3; i++) {
        let low = i + Math.ceil(Math.random() * 10);
        let high = low + Math.ceil(Math.random() * 10);
        data.push({
            index: i,
            name: 'Regular Task ' + (i + 1),
            start: new Date(date.getTime() + low * 3600 * 24 * 1000),
            end: new Date(date.getTime() + high * 3600 * 24 * 1000)
        });
    }
    // add a repeating task (same "index" value)
    let dt = data[0].start;
    for (let i = 0; i < 5; i++) {
        data.push({
            index: 3,
            name: 'First Repeating Task',
            start: dt,
            end: DateTime.addDays(dt, 4)
        });
        dt = DateTime.addDays(dt, 7);
    }
    // add another repeating task
    dt = DateTime.addDays(data[0].start, 2);
    for (let i = 0; i < 5; i++) {
        data.push({
            index: 4,
            name: 'Second Repeating Task',
            start: dt,
            end: DateTime.addDays(dt, 5)
        });
        dt = DateTime.addDays(dt, 7);
    }
    // done
    return data;
}
