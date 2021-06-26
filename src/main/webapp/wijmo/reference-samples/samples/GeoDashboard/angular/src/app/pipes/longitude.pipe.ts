import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'longitude' })
export class LongitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string {
        if (!exponent) {
            exponent = 0;
        }
        value = value * 1;
        const ew = value > 0 ? 'E' : 'W';
        value = Math.abs(value);
        const deg = Math.floor(value);
        const min = Math.floor((value - deg) * 60);
        const sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ew;
    }
}
