import { Component, Input } from '@angular/core';

// Date cell renderer component that allows to edit a cell without switching to the cell edit mode.
@Component({
    selector: 'editable-date-renderer',
    templateUrl: './editable-date.component.html',
})
export class EditableDateComponent {
    // The 'cell' object provided by the wjFlexGridCellTemplate directive.
    @Input() cell: any;
}
