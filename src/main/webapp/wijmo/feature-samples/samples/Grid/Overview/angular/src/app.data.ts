import { Injectable } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
import {
    IValidator, RequiredValidator, MinNumberValidator, MinDateValidator,
    MaxNumberValidator, MaxDateValidator
} from './app.validation';
//
export class KeyValue {
    key: number;
    value: string;

    static NotFound: KeyValue = { key: -1, value: '' };
}
//
export class Country {
    name: string;
    id: number;
    flag: string;

    static NotFound: Country = { id: -1, name: '', flag: '' };
}
//
@Injectable()
export class DataService {

    private _products: string[] = ['Widget', 'Gadget', 'Doohickey'];
    private _colors: string[] = ['Black', 'White', 'Red', 'Green', 'Blue'];
    private _countries: Country[] = [
        { id: 0, name: 'US', flag: 'us' },
        { id: 1, name: 'Germany', flag: 'de' },
        { id: 2, name: 'UK', flag: 'gb' },
        { id: 3, name: 'Japan', flag: 'jp' },
        { id: 4, name: 'Italy', flag: 'it' },
        { id: 5, name: 'Greece', flag: 'gr' }
    ];

    private _validationConfig: { [prop: string]: IValidator[] } = {
        'date': [
            new RequiredValidator(),
            new MinDateValidator(new Date('2000-01-01T00:00:00')),
            new MaxDateValidator(new Date('2100-01-01T00:00:00'))
        ],
        'time': [
            new RequiredValidator(),
            new MinDateValidator(new Date('2000-01-01T00:00:00')),
            new MaxDateValidator(new Date('2100-01-01T00:00:00'))
        ],
        'productId': [
            new RequiredValidator(),
            new MinNumberValidator(0, `{0} can't be less than {1} (${this._products[0]})`),
            new MaxNumberValidator(
                this._products.length - 1,
                `{0} can't be greater than {1} (${this._products[this._products.length - 1]})`
            )
        ],
        'countryId': [
            new RequiredValidator(),
            new MinNumberValidator(0, `{0} can't be less than {1} (${this._countries[0].name})`),
            new MaxNumberValidator(
                this._countries.length - 1,
                `{0} can't be greater than {1} (${this._countries[this._countries.length - 1].name})`
            )
        ],
        'colorId': [
            new RequiredValidator(),
            new MinNumberValidator(0, `{0} can't be less than {1} (${this._colors[0]})`),
            new MaxNumberValidator(
                this._colors.length - 1,
                `{0} can't be greater than {1} (${this._colors[this._colors.length - 1]})`
            )
        ],
        'price': [
            new RequiredValidator(),
            new MinNumberValidator(0, `Price can't be a negative value`)
        ]
    };

    getCountries(): Country[] {
        return this._countries;
    }

    getProducts(): string[] {
        return this._products;
    }

    getColors(): string[] {
        return this._colors;
    }

    getHistoryData(): number[] {
        return this._getRandomArray(25, 100);
    }

    getData(count: number): any[] {
        const data = [];
        const dt = new Date();
        const year = dt.getFullYear();

        const itemsCount = Math.max(count, 5);

        // add items
        for (let i = 0; i < itemsCount; i++) {
            const item = this._getItem(i, year);
            data.push(item);
        }

        // set invalid data to demonstrate errors visualization
        data[1].price = -2000;
        data[2].date = new Date('1970-01-01T00:00:00');
        data[4].time = undefined;
        data[4].price = -1000;

        return data;
    }

    validate(item: any, prop: string, displayName: string): string {
        const validators: IValidator[] = this._validationConfig[prop];
        if (wjcCore.isUndefined(validators)) {
            return '';
        }

        const value = item[prop];
        for (let i = 0; i < validators.length; i++) {
            const validationError = validators[i].validate(displayName, value);
            if (!wjcCore.isNullOrWhiteSpace(validationError)) {
                return validationError;
            }
        }
    }

    private _getItem(i: number, year: number): any {
        const date = new Date(year, i % 12, 25, i % 24, i % 60, i % 60);
        const countryIndex = this._getRandomIndex(this._countries)
        const productIndex = this._getRandomIndex(this._products);
        const colorIndex = this._getRandomIndex(this._colors);

        const item = {
            id: i,
            date: date,
            time: new Date(date.getTime() + Math.random() * 30 * (24 * 60 * 60 * 1000)),
            countryId: this._countries[countryIndex].id,
            productId: productIndex,
            colorId: colorIndex,
            price: wjcCore.toFixed(Math.random() * 10000 + 5000, 2, true),
            change: wjcCore.toFixed(Math.random() * 1000 - 500, 2, true),
            history: this.getHistoryData(),
            discount: wjcCore.toFixed(Math.random() / 4, 2, true),
            rating: this._getRating(),
            active: i % 4 == 0,
            size: Math.floor(100 + Math.random() * 900),
            weight: Math.floor(100 + Math.random() * 900),
            quantity: Math.floor(Math.random() * 10),
            description: "Across all our software products and services, our focus is on helping our customers achieve their goals. Our key principles – thoroughly understanding our customers' business objectives, maintaining a strong emphasis on quality, and adhering to the highest ethical standards – serve as the foundation for everything we do."
        };

        return item;
    }

    private _getRating(): number {
        return Math.ceil(Math.random() * 5);
    }

    private _getRandomIndex(arr: any[]): number {
        return Math.floor(Math.random() * arr.length);
    }

    private _getRandomArray(len: number, maxValue: number): number[] {
        const arr: number[] = [];
        for (let i = 0; i < len; i++) {
            arr.push(Math.floor(Math.random() * maxValue));
        }
        return arr;
    }
}
