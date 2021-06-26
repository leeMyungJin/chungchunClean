import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataService {

    // get data for grid
    public getData(count: number, activeState?: boolean): any[] {
        const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: activeState == null ? i % 4 === 0 : activeState
            });
        }
        return data;
    }
}
