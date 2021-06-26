export function getData() {
    let months = 'jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec'.split(','), data = [];
    //
    for (let i = 0; i < months.length; i++) {
        data.push({
            month: months[i],
            x: i - 0.5,
            sms: Math.round(Math.random() * 50),
            email: Math.round(Math.random() * 100)
        });
    }
    //
    return data;
}
