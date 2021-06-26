import { Component, Input } from '@angular/core';

// String cell renderer component that allows to edit a cell without switching to the cell edit mode.
@Component({
    selector: 'editable-string-renderer',
    templateUrl: './editable-string.component.html',
})
export class EditableStringComponent {
    // The 'cell' object provided by the wjFlexGridCellTemplate directive.
    @Input() cell: any;
}
