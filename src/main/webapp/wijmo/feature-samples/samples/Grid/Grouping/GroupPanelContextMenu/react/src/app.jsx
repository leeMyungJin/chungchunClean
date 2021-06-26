import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import '@grapecity/wijmo.touch'; // support drag/drop on touch devices
import { FlexGrid } from '@grapecity/wijmo.react.grid';
import { GroupPanel } from "@grapecity/wijmo.react.grid.grouppanel";
import { Menu, MenuItem, MenuSeparator } from "@grapecity/wijmo.react.input";
import { CollectionView, SortDescription } from '@grapecity/wijmo';
import { getData } from "./data";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new CollectionView(getData(), {
                groupDescriptions: ['country', 'product']
            }),
            flex: null,
            contextMenu: null,
            groupIndex: null
        };
    }
    render() {
        return <div className="container-fluid">
            <GroupPanel initialized={s => {
            s.hostElement.addEventListener('contextmenu', e => {
                let groupDescription = s.hitTest(e), cv = s.collectionView;
                if (groupDescription) {
                    this.setState({ groupIndex: cv.groupDescriptions.indexOf(groupDescription) });
                    this.state.contextMenu.show(e);
                }
                e.preventDefault();
            });
        }} className="group-panel" grid={this.state.grid} placeholder="Drag columns here to create groups"/>

            <FlexGrid initialized={s => this.setState({ grid: s })} itemsSource={this.state.data}/>

            <Menu style={{ display: 'none' }} dropDownCssClass='ctx-menu' initialized={s => this.setState({ contextMenu: s })} itemClicked={s => {
            let grid = this.state.grid, cv = grid.collectionView, groupIndex = this.state.groupIndex;
            switch (s.selectedIndex) {
                case 0: // expand all
                    grid.collapseGroupsToLevel(groupIndex + 1);
                    break;
                case 1: // collapse all
                    grid.collapseGroupsToLevel(groupIndex);
                    break;
                case 3: // sort asc
                case 4: // sort desc
                case 5: // no sort
                    cv.deferUpdate(() => {
                        cv.sortDescriptions.clear();
                        if (s.selectedIndex != 5) {
                            let binding = cv.groupDescriptions[groupIndex].propertyName;
                            cv.sortDescriptions.push(new SortDescription(binding, s.selectedIndex == 3));
                        }
                    });
                    break;
                case 7: // remove group
                    cv.groupDescriptions.removeAt(groupIndex);
                    break;
            }
        }}>
                
                <MenuItem>
                    <span className='wj-glyph-down-right'></span> Expand All
                </MenuItem>
                <MenuItem>
                    <span className='wj-glyph-right'></span> Collapse All
                </MenuItem>
                <MenuSeparator />
                <MenuItem>
                    <span className='wj-glyph-up'></span> Sort Ascending
                </MenuItem>
                <MenuItem>
                    <span className='wj-glyph-down'></span> Sort Descending
                </MenuItem>
                <MenuItem>
                    <span className='wj-glyph-circle'></span> Remove Sort
                </MenuItem>
                <MenuSeparator />
                <MenuItem>
                    <span>&times;</span> Remove Group
                </MenuItem>
            </Menu>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
