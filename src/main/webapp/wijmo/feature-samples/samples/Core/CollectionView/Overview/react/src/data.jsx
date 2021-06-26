// data used to generate random items
const _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
const _countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
//
export function getData(count) {
    let data = [];
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let countryId = Math.floor(Math.random() * _countries.length), colorId = Math.floor(Math.random() * _colors.length);
        //
        // add the item to the list
        data.push({
            id: i,
            country: _countries[countryId],
            color: _colors[colorId],
            amount: Math.random() * 10000 - 5000
        });
    }
    //
    return data;
}
