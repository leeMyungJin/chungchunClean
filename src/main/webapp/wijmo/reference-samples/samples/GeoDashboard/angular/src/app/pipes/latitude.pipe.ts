import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'latitude' })
export class LatitudePipe implements PipeTransform {
    transform(value: number, exponent: number): string {
        if (!exponent) {
            exponent = 0;
        }
        value = value * 1;
        const ns = value > 0 ? 'N' : 'S';
        value = Math.abs(value);
        const deg = Math.floor(value);
        const min = Math.floor((value - deg) * 60);
        const sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ns;
    }
}
