import { Injectable } from '@angular/core';
import { DateTime } from '@grapecity/wijmo';

export interface DataItem {
    date: Date;
    buyer: string;
    type: string;
    amount: number;
}

function randomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

@Injectable()
export class DataService {
    addData(data: DataItem[], cnt: number): DataItem[] {
        var today = new Date(),
            buyers = 'Mom,Dad,Kelly,Sheldon'.split(','),
            types = 'Food,Clothes,Fuel,Books,Sports,Music'.split(',');
        for (var i = 0; i < cnt; i++) {
            data.push({
                date: DateTime.addYears(today, -Math.random() * 3),
                buyer: randomItem(buyers),
                type: randomItem(types),
                amount: 20 + Math.random() * 1000
            });
        }
        return data;
    }
}