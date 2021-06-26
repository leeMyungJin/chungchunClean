export function getData() {
    return [
        {
            name: 'SAMSUNG 65-INCH Q9FN QLED TV',
            rating: 4,
            price: 2539.99,
            size: 65,
            type: 'LCD with Quantum Dots',
            refresh: 120,
            hdmi: 4.5,
            img: 'https://cdn.grapecity.com/wijmo/images/1.png'
        },
        {
            name: 'TCL 6 SERIES 65-INCH ROKU TV',
            rating: 4,
            price: 999.99,
            size: 65,
            type: 'LCD',
            refresh: 60,
            hdmi: 3,
            img: 'https://cdn.grapecity.com/wijmo/images/2.png'
        },
        {
            name: 'LG 55-INCH C7 OLED (OLED55C7P)',
            rating: 4.5,
            price: 679.99,
            size: 55,
            type: 'OLED',
            refresh: 120,
            hdmi: 4,
            img: 'https://cdn.grapecity.com/wijmo/images/3.png'
        },
        {
            name: 'VIZIO P-SERIES 65-INCH P65-F1',
            rating: 4,
            price: 1124.67,
            size: 65,
            type: 'LCD',
            refresh: 120,
            hdmi: 5,
            img: 'https://cdn.grapecity.com/wijmo/images/4.png'
        },
        {
            name: 'TCL 43S517 ROKU SMART 4K TV',
            rating: 3.5,
            price: 319.99,
            size: 43,
            type: 'LCD',
            refresh: 60,
            hdmi: 3,
            img: 'https://cdn.grapecity.com/wijmo/images/1.png'
        },
        {
            name: 'SAMSUNG 65-INCH Q6F QLED TV',
            rating: 3,
            price: 1597.99,
            size: 65,
            type: 'LCD with Quantum Dot',
            refresh: 120,
            hdmi: 4,
            img: 'https://cdn.grapecity.com/wijmo/images/2.png'
        }
    ];
}

export function getDataColumns() {
    return [
        { binding: 'img', header: ' ', align: 'center' },
        { binding: 'name', header: 'Model', align: 'center', wordWrap: true },
        { binding: 'rating', header: 'Rating', align: 'center', format: 'n1' },
        { binding: 'price', header: 'Price', format: 'c2', align: 'center' },
        { binding: 'size', header: 'Screen Size (")', align: 'center' },
        { binding: 'type', header: 'Screen Type', align: 'center' },
        { binding: 'refresh', header: 'Refresh Rate (Hz)', align: 'center' },
        { binding: 'hdmi', header: 'HMI ports', format: 'n0', align: 'center' }
    ];
}
