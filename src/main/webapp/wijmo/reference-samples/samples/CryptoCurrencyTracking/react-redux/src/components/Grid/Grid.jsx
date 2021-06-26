import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
// wijmo componets
import { Globalize } from '@grapecity/wijmo';
import { SelectionMode } from '@grapecity/wijmo.grid';
import { FlexGridDetailProvider } from '@grapecity/wijmo.grid.detail';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
// material-ui
import { PlaylistAdd, FilterList } from '@material-ui/icons';
// components
import { default as DetailPanel } from '../DetailPanel/DetailPanel';
// utils
import { default as Assets } from '../../constants/AssetsTypes';
import { formatCell } from '../../utils/wjUtils';
// css
import './Grid.css';
import './FlexGrid.css';
class Grid extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { detailCell: null, detailCellSymbol: null };
        /**
         * Callback to store a reference to a FlexGrid node.
         * @arg {Object] ref
         */
        this.setFlexGridRef = ref => {
            this.flexGridRef = ref;
            this.props.onUpdateReference(ref);
        };
        this.canRenderDetails = true;
        this.cellElements = {}; // stored cell elements
        this.flexGridRef = null; // wjFlexGrid reference
        this.requestClearCells = false; // request clear cell elements on next formatItem
        /**
         * Customize cell appearance.
         * @arg {HTMLElement] cell
         * @arg {Object] dataItem
         * @arg {Object] col
         * @arg {boolean] isCustomPaint
         * @arg {boolean] [flare=true]
         */
        this.handleFormatCell = (cell, dataItem, col, isCustomPaint, flare = true) => {
            // eslint-disable-next-line
            cell.innerHTML = isCustomPaint
                ? `<div>${formatCell(dataItem, col, flare)}</div>`
                : `<div>${Globalize.format(dataItem[col.binding], col.format)}</div>`;
        };
        /**
         * Occurs after the grid has updated its internal layout
         */
        this.handleUpdatingView = () => {
            // clear cell elements on next formatItem
            this.requestClearCells = true;
        };
        /**
         * Occurs when an element representing a cell has been created.
         * @arg {Object] gridPanel - GridPanel that contains the range.
         * @arg {Object] cellRange - Range of cells affected by the event.
         */
        this.handleFormatItem = (gridPanel, cellRange) => {
            const { rows, columns, cells } = gridPanel;
            const { cell, col, row, panel } = cellRange;
            const { itemsSource, settings } = this.props;
            if (cells === panel) {
                const column = columns[col];
                const rowDataItem = rows[row].dataItem || {};
                const symbol = rowDataItem.symbol || null;
                const dataItem = itemsSource.find(entry => symbol === entry.symbol);
                // clear cell elements
                if (this.requestClearCells) {
                    this.cellElements = {};
                    this.requestClearCells = false;
                }
                if (dataItem) {
                    // create stored cell element (if it is needed)
                    if (!this.cellElements[symbol])
                        this.cellElements[symbol] = {};
                    this.cellElements[symbol][column.binding] = cell; // store cell element
                    this.handleFormatCell(cell, dataItem, column, settings.isCustomCells); // custom painting
                }
            }
        };
        /**
         * Occurs after the grid have been initialized.
         * @arg {Object] gridPanel - GridPanel that contains the range.
         */
        this.handleInitialized = gridPanel => {
            // Create detail provider
            const detailProvider = new FlexGridDetailProvider(gridPanel, {});
            // set the callback function that creates detail cells
            detailProvider.createDetailCell = row => {
                const detailCell = document.createElement('div');
                this.setState({ detailCell, detailCellSymbol: row.dataItem.symbol });
                return detailCell;
            };
            // set the callback function that disposes of detail cells.
            detailProvider.disposeDetailCell = () => {
                this.setState({ detailCell: null, detailCellSymbol: null });
            };
        };
        /**
         * Renders additional information.
         * @arg {string] filterText
         */
        this.renderNotification = filterText => (<div className="helper">
            {filterText ? (<React.Fragment>
                    <FilterList className="helper-icon"/>
                    <div>No symbols found containing: {filterText}</div>
                </React.Fragment>) : (<React.Fragment>
                    <PlaylistAdd className="helper-icon"/>
                    <div>Please add symbols to a list.</div>
                </React.Fragment>)}
        </div>);
    }
    shouldComponentUpdate(nextProps) {
        const grid = this.flexGridRef.control;
        const { itemsSource, settings } = this.props;
        const { detailCell } = this.state;
        const nextItemSource = nextProps.itemsSource;
        const nextSettings = nextProps.settings;
        const isChangedItemsSource = JSON.stringify(itemsSource.map(item => item.id).sort()) !== JSON.stringify(nextItemSource.map(item => item.id).sort());
        const isUpdated = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
        const updateGrid = () => {
            this.canRenderDetails = true;
            // update itemsSource if it changed
            if (isChangedItemsSource)
                grid.itemsSource = nextProps.itemsSource;
            // get the modified rows
            const modified = isChangedItemsSource
                ? nextProps.itemsSource
                : nextItemSource.filter((entry, index) => isUpdated(entry, itemsSource[index]));
            // update the modified rows
            modified.forEach(dataItem => {
                const storedRow = this.cellElements[dataItem.symbol]; // get stored row
                if (storedRow) {
                    grid.columns.forEach(col => {
                        const cell = storedRow[col.binding]; // get stored cell
                        if (cell) {
                            this.handleFormatCell(cell, dataItem, col, nextSettings.isCustomCells);
                        }
                    });
                }
            });
        };
        // invalidates the grid causing an asynchronous refresh
        if (nextSettings.isCustomCells !== settings.isCustomCells)
            grid.invalidate();
        // breaks if there are not any updates available
        if (!isUpdated(nextItemSource, itemsSource))
            return true;
        // unmounts detail rows in case of changing the itemSource
        if (isChangedItemsSource && detailCell) {
            this.canRenderDetails = false;
            this.forceUpdate(() => updateGrid());
        }
        else {
            updateGrid();
        }
        return true;
    }
    render() {
        const { columns, section, settings, filter, itemsSource } = this.props;
        const { detailCell, detailCellSymbol } = this.state;
        const columnsData = columns[section];
        const getDataItem = symbol => itemsSource.find(item => symbol === item.symbol);
        return (<div className="grid">
                {!itemsSource.length && this.renderNotification(filter)}
                <FlexGrid isReadOnly className="flex-grid" ref={this.setFlexGridRef} selectionMode={SelectionMode.Row} autoGenerateColumns={false} rows={{ defaultSize: settings.rowHeight }} columnHeaders={{ rows: { defaultSize: 78 } }} frozenRows={settings.isFreezeFirstRow ? 1 : 0} frozenColumns={settings.isFreezeFirstCol ? 1 : 0} formatItem={this.handleFormatItem} initialized={this.handleInitialized} updatingView={this.handleUpdatingView}>
                    {columnsData.map((column, index) => (<FlexGridColumn key={column.binding || index} {...column}/>))}
                </FlexGrid>
                
                {Boolean(detailCell && this.canRenderDetails) &&
            ReactDOM.createPortal(<DetailPanel dataItem={getDataItem(detailCellSymbol)}/>, detailCell)}
            </div>);
    }
}
Grid.propTypes = {
    section: PropTypes.oneOf([
        Assets.OVERVIEW,
        Assets.PERFORMANCE,
        Assets.TECHNICAL
    ]).isRequired,
    columns: PropTypes.shape({
        binding: PropTypes.string,
        header: PropTypes.string,
        visible: PropTypes.bool,
    }).isRequired,
    itemsSource: PropTypes.array.isRequired,
    settings: PropTypes.shape({
        isAutoUpdate: PropTypes.bool,
        isCustomCells: PropTypes.bool,
        isFreezeFirstCol: PropTypes.bool,
        isFreezeFirstRow: PropTypes.bool,
        rowHeight: PropTypes.number,
        updateInterval: PropTypes.number,
    }).isRequired,
    filter: PropTypes.string.isRequired,
    onUpdateReference: PropTypes.func.isRequired,
};
export default Grid;
