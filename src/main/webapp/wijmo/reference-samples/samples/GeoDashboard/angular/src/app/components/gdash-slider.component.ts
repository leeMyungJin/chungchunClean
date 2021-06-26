import { Component, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-gdash-slider',
    templateUrl: './gdash-slider.component.html'
})
export class GdashSliderComponent implements OnChanges {
    position: string;

    @Input() value: number;
    @Input() color: string;
    @Input() palette: string[];

    constructor() {
    }

    ngOnChanges(changes: any) {
        if (!changes.value) {
            return;
        }
        let value = changes.value.currentValue;
        // calculate slider position (as a percentage)
        value = Math.log(this.value / 100);
        value = Math.min(Math.max(value, -1.5), +1.5);
        value = (value + 1.5) / 3;

        // convert to pixels
        value = value * 230 - 15;

        // apply position
        this.position = value + 'px';
    }
}
