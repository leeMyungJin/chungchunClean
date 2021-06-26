import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-esri-crosshair',
    templateUrl: './esri-crosshair.component.html'
})
export class EsriCrosshairComponent {
    @Input() palette: string[];
    @Input() color: string;

    constructor() {
    }
}
