import { CollectionView, DateTime } from '@grapecity/wijmo';
// raw data
export function getData(cnt = 20) {
    let countries = 'US,Germany,UK,Japan,Italy,Greece,Portugal,Spain'.split(','), names = 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(','), colors = 'Red,Green,Blue,White,Black,Yellow,Orange'.split(','), today = new Date(), data = [];
    for (let i = 0; i < cnt; i++) {
        data.push({
            id: i,
            date: DateTime.addDays(today, -i),
            name: names[i % names.length],
            country: countries[i % countries.length],
            color: colors[i % colors.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.round(Math.random() * 20000),
            expenses: Math.round(Math.random() * 10000)
        });
    }
    return data;
}
// grouped data
export function getGroupedData(cnt = 20) {
    return new CollectionView(getData(cnt), {
        groupDescriptions: ['country', 'color']
    });
}
// MultiRow layout definition
export function getLayoutDefinition() {
    return [
        { cells: [{ binding: 'id', header: 'ID' }] },
        { cells: [{ binding: 'country', header: 'Country' }] },
        { cells: [{ binding: 'color', header: 'Color' }] },
        {
            cells: [
                { binding: 'sales', header: 'Sales', cssClass: 'sales', aggregate: 'Sum' },
                { binding: 'expenses', header: 'Expenses', cssClass: 'expenses', aggregate: 'Sum' }
            ]
        }
    ];
}
