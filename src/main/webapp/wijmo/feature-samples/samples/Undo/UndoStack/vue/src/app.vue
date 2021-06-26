<template>
    <div class="app container-fluid">

        <!-- undo toolbar -->
        <div class="toolbar">
            <button id="undo" class="btn btn-primary"
                :disabled="!canUndo"
                @click="undoStack.undo()">
                <span class="arrow">&#x21B6;</span> Undo (ctrl+Z)
            </button>
            <button id="redo" class="btn btn-primary" 
                :disabled="!canRedo"
                @click="undoStack.redo()">
                <span class="arrow">&#x21B7;</span> Redo (ctrl+Y)
            </button>
            <button class="btn" disabled>
                Action Count: {{actionCount}}
            </button>
            <button id="clear" class="btn btn-default"
                :disabled="!actionCount"
                @click="undoStack.clear()">
                Clear Undo/Redo Stack
            </button>
        </div>

        <!-- undoable form -->
        <form id="undoable-form">
            <div class="row">

                <!-- HTML input elements -->
                <div class="col-md-5">
                    <h3>HTML Input Elements</h3>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input id="firstName" class="form-control" placeholder="First Name" />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" class="form-control" placeholder="Last Name" />
                    </div>
                    <div class="form-group">
                        <label for="select">Select</label>
                        <select id="select" class="form-control">
                            <option value="value1">Apples</option>
                            <option value="value2" selected>Oranges</option>
                            <option value="value3">Grapes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="area">TextArea</label>
                        <textarea id="area" class="form-control" placeholder="textarea"></textarea>
                    </div>
                    <div class="form-group label-indent">
                        <label class="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox1" value="option1" checked/> Red
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox2" value="option2"/> Green
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" id="inlineCheckbox3" value="option3"/> Blue
                        </label>
                    </div>
                    <div class="form-group label-indent">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked/> Hot
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/> Cold
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/> Medium
                        </label>
                    </div>
                </div>

                <!-- Wijmo controls -->
                <div class="col-md-7">
                    <h3>Wijmo Controls</h3>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <wj-combo-box id="country" placeholder="Country"
                            :itemsSource="countries"
                            :isRequired="false"
                            :selectedIndex="-1"/>
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <wj-input-number id="amount" placeholder="Amount"
                            :format="'c2'"
                            :min="0"
                            :step="10"
                            :isRequired="false"
                            :value="null"/>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <wj-input-date id="date" placeholder="Date"
                            :isRequired="false"
                            :value="null"/>
                    </div>
                    <div class="form-group">
                        <label for="color" title="ComboBox">Color</label>
                        <wj-combo-box id="color"
                            :itemsSource="colors"
                            :isRequired="false"
                            :selectedIndex="-1"/>
                    </div>
                    <div class="form-group">
                        <label for="ac" title="AutoComplete">Color</label>
                        <wj-auto-complete id="ac"
                            :itemsSource="colors"
                            :selectedIndex="-1"/>
                    </div>
                    <div class="form-group">
                        <label for="colors" title="MultiSelect">Colors</label>
                        <wj-multi-select id="colors"
                            :itemsSource="colors"/>
                    </div>
                    <div class="form-group">
                        <label for="mac" title="MultiAutoComplete">Colors</label>
                        <wj-multi-auto-complete id="mac"
                            :itemsSource="colors"
                            :selectedIndex="-1"/>
                    </div>
                    <div class="form-group">
                        <label for="gauge">Gauge</label>
                        <wj-radial-gauge 
                            :thickness=".2"
                            :min="0"
                            :max="100"
                            :value="50"
                            :isReadOnly="false"
                            :tickSpacing="10"
                            :showTicks="true"
                            :showText="'Value'"
                            :needleShape="'Outer'"
                            :needleLength="'Inner'"/>
                    </div>
                    <div class="form-group">
                        <label for="grid">Grid</label>
                        <wj-flex-grid div id="grid"
                            :anchorCursor="true"
                            :frozenColumns="2"
                            :allowAddNew="true"
                            :allowDelete="true"
                            :itemsSource="data"
                            :initialized="initGrid" />
                        <button id="add-row" class="btn btn-primary"
                            @click="addRow($event)">
                            Add Row in Code
                        </button>
                        <button id="del-row" class="btn btn-primary"
                            @click="deleteRow($event)">
                            Delete Row in Code
                        </button>
                        <label>
                            New Row At Top
                            <input id="nr-top" class="wj-no-undo" type="checkbox"
                                @click="grid.newRowAtTop = $event.target.checked" />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'src/app.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.gauge';
    import '@grapecity/wijmo.vue2.grid';
    import { UndoStack } from '@grapecity/wijmo.undo';
    import { CellRangeEventArgs } from '@grapecity/wijmo.grid';

    let App = Vue.extend({
        name: "app",

        // component state
        data: function() {
            return {
                undoStack:  null,
                grid: null,
                data: this.getData(),
                colors: this.getColors(),
                countries: this.getCountries(),
                names: this.getNames(),
                canUndo: false,
                canRedo: false,
                actionCount: 0
            };
        },

        // enable undo/redo for the form
        mounted() {
            this.undoStack = new UndoStack('#undoable-form', {
                maxActions: 50,
                stateChanged: s => {
                    this.canUndo = s.canUndo;
                    this.canRedo = s.canRedo;
                    this.actionCount = s.actionCount;
                }
            });
        },        

        // component methods
        methods: {

            // initialize grid
            initGrid(s) {

                // save reference to the grid
                this.grid = s;

                // add data maps to some columns
                let col = s.getColumn('name');
                col.dataMap = this.names;
                col.dataMap.isEditable = true;
                col = s.getColumn('country');
                col.dataMap = this.countries;
            },

            // add a row in code, calling "onRowAdded" to enable undo for this action
            addRow(e) {
                let g = this.grid,
                    view = g.editableCollectionView,
                    newItem = view.addNew();
                g.focus();
                newItem.id = -1;
                newItem.name = 'new item';
                newItem.active = true;
                g.onRowAdded(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
                view.commitNew();
                e.preventDefault(); // don't submit the form
            },

            // delete a row in code, calling "onDeletingRow" to enable undo for this action
            deleteRow(e) {
                let g = this.grid,
                    view = g.editableCollectionView;
                g.focus();
                if (view.items.length) {
                    let sel = g.selection;
                    if (sel.row > -1) {
                        let item = g.rows[sel.row].dataItem;
                        g.onDeletingRow(new CellRangeEventArgs(g.cells, g.selection)); // create undoable action
                        view.remove(item);
                    }
                }
                e.preventDefault(); // don't submit the form
            },

            // generate some data for the sample
            getColors() {
                return 'Black,Blue,Brown,Green,Magenta,Orange,Pink,Purple,Red,Teal,Violet,White,Yellow'.split(',');
            },
            getCountries() {
                return 'US,Germany,UK,Japan,Italy,Greece'.split(',');
            },
            getNames() {
                return 'Abe,Bob,Chuck,Dan,Ed,Fred'.split(',');
            },
            getData() {
                let countries = this.getCountries(),
                    names = this.getNames(),
                    data = [];
                for (let i = 0; i < 50; i++) {
                    data.push({
                        id: i,
                        name: names[i % names.length],
                        country: countries[i % countries.length],
                        active: i % 5 != 0,
                        downloads: Math.round(Math.random() * 200000),
                        sales: Math.round(Math.random() * 20000),
                    });
                }
                return data;
            }
        }
    });
    new Vue({ render: h => h(App) }).$mount("#app");
</script>
