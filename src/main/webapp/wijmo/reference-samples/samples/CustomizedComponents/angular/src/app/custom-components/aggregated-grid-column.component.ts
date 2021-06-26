import { Component } from '@angular/core';

// A column definition for the AggregatedGrid component, which is used as a child of aggregated-grid in markup,
// in the same way as wj-flex-grid-column components are used with wj-flex-grid.
// Exposes the same set of properties for binding in markup as wj-flex-grid-column does, plus the cellTemplate
// property that can be assigned with a type reference to a component that should be used as the column cell template.
@Component({
  selector: 'aggregated-grid-column',
  template: '',
  // We need to provide a list of bindable properties here. We could just use wjFlexGridMeta.inputs
  // property to specify all WjFlexGridColumn's properties here, and this will work with Ng2 run-time
  // compiler, but will be rejected by the AoT compiler. The latter requires that any property
  // specified in the 'inputs' metadata should be explicitly defined as a component class member.
  // Because of this, we just add few properties that we actually use, and declare them as class
  // members.
  // We also add the 'cellTemplate' property that is absent in WjFlexGridColumn and specific to
  // AggregatedGridColumn. This property allows to specify a component type that should be used
  // as the column's cell template.
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['header', 'binding', 'width', 'cellTemplate']
})
export class AggregatedGridColumnComponent {
  header: string;
  binding: string;
  width: number | string;
  // Defines a type of a component that should be used as the column cell template.
  cellTemplate: any;
}
