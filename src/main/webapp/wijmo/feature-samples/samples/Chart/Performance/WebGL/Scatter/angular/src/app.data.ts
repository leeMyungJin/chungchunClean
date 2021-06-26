import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData(cx: number, cy: number, n: number, maxr: number) {
        let data = new Array(n);
        let r0 = 0.1 + maxr;
        for (let i = 0; i < data.length; i++) {
            let a = 2 * Math.PI * Math.random();
            let r = r0 * Math.sqrt(-2 * Math.log(Math.random()));
            data[i] = {
                x: cx + r * Math.cos(a),
                y: cy + r * Math.sin(a)
            };
        }
        return data;
    }
}
