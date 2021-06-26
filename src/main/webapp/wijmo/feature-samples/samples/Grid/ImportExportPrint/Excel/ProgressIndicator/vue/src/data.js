export function getData(count) {
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
        products = ['Widget', 'Gadget', 'Doohickey'],
        data = [];
    //
    for (let i = 0; i < count; i++) {
        let countryId = Math.floor(Math.random() * countries.length),
            productId = Math.floor(Math.random() * products.length);
        //
        let item = {
            id: i,
            country: countries[countryId],
            product: products[productId],
            amount: Math.random() * 10000,
            amount2: Math.random() * 10000,
            discount: Math.random() / 4,
            active: i % 4 == 0
        };
        //
        data.push(item);
    }
    //
    return data;
}