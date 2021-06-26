import { Component, Inject } from '@angular/core';

import { DataService } from '../services/data.service';
import { EditableDateComponent } from '../custom-components/cell-templates/editable-date.component';
import { EditableStringComponent } from '../custom-components/cell-templates/editable-string.component';
import { SelectionTypeEnum } from '../custom-components/cell-templates/selection-type.enum';

@Component({
    selector: 'aggregated-view',
    templateUrl: './aggregated-view.component.html',
})
export class AggregatedViewComponent {
    /* tslint:disable:variable-name */

    // Cell render component types, to use in markup
    EditableDateRenderer = EditableDateComponent;
    EditableStringRenderer = EditableStringComponent;

    // References SelectionType enum to use it in markup.
    SelectionType = SelectionTypeEnum;

    /* tslint:enable:variable-name */

    // data array
    data: any[];

    // type of selection provided by the Select column
    selectionType = SelectionTypeEnum.Single;

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(150, false);
    }
}
