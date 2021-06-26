export function getData(): any[] {
    let countries = [
        'United States of America',
        'Germany (Deutsches Bundesrepublik)',
        'United Kingdom',
        'Japan (Nippon)',
        'Italy (Il Bel Paese)',
        'Greece'
    ];
    let data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            from: getOne(countries),
            to: getOne(countries),
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    return data;
}

function getOne(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
