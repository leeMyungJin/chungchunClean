import * as core from '@grapecity/wijmo';
const data = generateData();
function generateData() {
    var data = [], today = new Date();
    for (var i = 0; i < 12; i++) {
        var sales = 100 + Math.random() * 800 + i * 50, expenses = 50 + Math.random() * 300 + i * 5;
        data.push({
            id: i,
            date: core.DateTime.addMonths(today, 12 - i),
            sales: sales,
            expenses: expenses,
            profit: sales - expenses,
        });
    }
    return data;
}
export function getData() {
    return data;
}
