export function getData(): any[] {
    let countries = 'United States of America,United Kingdom,Germany,Japan,People\'s Republic of China,South Africa'.split(','),
        data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            country: countries[Math.floor(Math.random() * countries.length)],
            fld1: '',
            fld2: Math.random() < 0.35 ? 'xxx' : '',
            fld3: Math.random() < 0.25 ? 'xxx' : '',
            sales: Math.random() * 100000,
        });
    }
    return data;
}
