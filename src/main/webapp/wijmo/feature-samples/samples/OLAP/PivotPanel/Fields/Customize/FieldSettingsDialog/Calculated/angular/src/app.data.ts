import { Injectable } from '@angular/core';
//
export type TDataItem = {
    product: string;
    country: string;
    active: boolean;
    date: Date;
    sales: number;
    downloads: number;
}
//
@Injectable()
export class DataService {
    getData(cnt: number)  {
        let year = new Date().getFullYear(),
            data: TDataItem[] = [];
        //
        for (let i = 0; i < cnt; i++) {
            data.push({
                product: this._randomInt(0, 1) ? 'Wijmo' : 'Aoba',
                country: this._randomInt(0, 1) ? 'USA' : 'Japan',
                active: i % 2 == 0,
                date: new Date(year - this._randomInt(0, 2), this._randomInt(0, 11), this._randomInt(0, 27) + 1),
                sales: this._randomInt(10, 20),
                downloads: this._randomInt(10, 200)
            });
        }
        //
        return data;
    }
    //
    private _randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}