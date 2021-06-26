export function getCountries() {
    return ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
}

export function getData() {
    return getCountries().map((country, index) => {
        return {
            id: index,
            country: country,
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (index + 1) % 4 == 0
        }
    });
}
