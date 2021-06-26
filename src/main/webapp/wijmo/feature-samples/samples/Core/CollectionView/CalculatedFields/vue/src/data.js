import { CollectionView } from '@grapecity/wijmo';

// some raw data
export function getData() {
    return [
        { product: 'Banana', brand: 'Chiquita', unitPrice: 45.95, qty: 12, discount: .08 },
        { product: 'Apple', brand: 'Granny', unitPrice: 65.95, qty: 23, discount: .02 },
        { product: 'Orange', brand: 'Sunkist', unitPrice: 52.95, qty: 16, discount: .04 },
        { product: 'Grape', brand: 'Pinot', unitPrice: 83.95, qty: 8, discount: .0 },
        { product: 'Watermelon', brand: '', unitPrice: 13.95, qty: 14, discount: .05 },
        { product: 'Mango', brand: 'Ganesh', unitPrice: 38.95, qty: 19, discount: .15 },
    ];
}

// add calculated fields
export function getCalculatedView() {
    return new CollectionView(getData(), {
        calculatedFields: {

            // function-based expressions
            fullName: $ => [$.brand, $.product].join(' '),
            allCaps: $ => $.fullName.toUpperCase(),
            totalPrice: $ => ($.unitPrice * $.qty) * (1 - $.discount),
            tax: $ => $.totalPrice * 0.12,

            // string-based expressions
            fullNameStr: '[$.brand, $.product].join(" ")',
            allCapsStr: '$.fullNameStr.toUpperCase()',
            totalPriceStr: '($.unitPrice * $.qty) * (1 - $.discount)',
            taxStr: '$.totalPrice * 0.12',
        }
    });
}
