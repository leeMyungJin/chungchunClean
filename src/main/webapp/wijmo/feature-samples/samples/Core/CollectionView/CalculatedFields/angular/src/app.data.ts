import { CollectionView } from '@grapecity/wijmo';

// some raw data
export interface IDataItem {
    product: string,
    brand: string,
    unitPrice: number,
    qty: number,
    discount: number
}
export function getData(): IDataItem[] {
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
export interface ICalcDataItem extends IDataItem {
    fullName: string;
    allCaps: string;
    totalPrice: number,
    tax: number;
}
export function getCalculatedView(): CollectionView<ICalcDataItem> {
    return new CollectionView(getData(), {
        calculatedFields: {

            // function-based expressions
            fullName: ($: ICalcDataItem) => [$.brand, $.product].join(' '),
            allCaps: ($: ICalcDataItem) => $.fullName.toUpperCase(),
            totalPrice: ($: ICalcDataItem) => ($.unitPrice * $.qty) * (1 - $.discount),
            tax: ($: ICalcDataItem) => $.totalPrice * 0.12,

            // string-based expressions
            fullNameStr: '[$.brand, $.product].join(" ")',
            allCapsStr: '$.fullNameStr.toUpperCase()',
            totalPriceStr: '($.unitPrice * $.qty) * (1 - $.discount)',
            taxStr: '$.totalPrice * 0.12',
        }
    });
}
