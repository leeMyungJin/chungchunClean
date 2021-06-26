import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-esri-legend',
    templateUrl: './esri-legend.component.html'
})
export class EsriLegendComponent {
    @Input() source: any;

    constructor() {
    }
}
