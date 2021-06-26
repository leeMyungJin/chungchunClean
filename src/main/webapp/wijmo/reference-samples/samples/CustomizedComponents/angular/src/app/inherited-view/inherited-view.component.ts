import { Component, Inject } from '@angular/core';

import { DataService } from '../services/data.service';
import { SelectionTypeEnum } from '../custom-components/cell-templates/selection-type.enum';

@Component({
    selector: 'inherited-view',
    templateUrl: './inherited-view.component.html',
})
export class InheritedViewComponent {
    /* tslint:disable:variable-name */

    // References SelectionType enum to use it in markup.
    SelectionType = SelectionTypeEnum;

    /* tslint:enable:variable-name */

    data: any[];

    // Row selection type
    selectionType = SelectionTypeEnum.Single;

    constructor(@Inject(DataService) dataSvc: DataService) {
        this.data = dataSvc.getData(150, false);
    }
}
