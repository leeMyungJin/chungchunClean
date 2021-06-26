import { Injectable } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';
//
@Injectable()
export class DataService {
    // data used to generate random items
    getData(): any[] {
        var countries = this.getCountries(),
            data = [];
        for (var i = 0; i < 30; i++) {
            data.push({
                id: i,
                date: new Date(2015, Math.floor(i / countries.length) % 12, (Math.floor(i / countries.length) + 1) % 28),
                country: countries[i % countries.length],
                countryMapped: i % countries.length,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.round(Math.random() * 10000 * 100) / 100,
                expenses: Math.random() * 5000,
                checked: i % 9 == 0
            });
        }
        return data;
    }

    getCountries(): string[] {
        return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    }

    getCv(data: any[]): wjcCore.CollectionView {
        var dataCv = new wjcCore.CollectionView(data);
        dataCv.groupDescriptions.push(new wjcCore.PropertyGroupDescription('country'));
        return dataCv;
    }
}