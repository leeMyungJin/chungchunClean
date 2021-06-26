export function getData() {
    // generate some random data
    let data = [];
    let products = ["Phones", "Computers", "Cameras", "Stereos"], countries = ["US", "Germany", "UK", "Japan", "Italy", "Greece"];
    for (let i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            downloads: Math.round(100 + Math.random() * 10000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    return data;
}
