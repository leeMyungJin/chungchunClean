import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { FormGroup, FormControlLabel, Typography, Menu, Button, Checkbox, } from '@material-ui/core';
import { PlaylistAdd as PlayListIcon, Refresh as RefreshIcon, Print as PrintIcon, GetApp as DownloadIcon, VisibilityOff as HideIcon, } from '@material-ui/icons';
// components
import AssetsTypes from '../../constants/AssetsTypes';
import { default as Row } from '../../components/Row/Row';
import { default as Column } from '../../components/Column/Column';
// css
import './ToolBar.css';
class ToolBar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { columnsVisibilityMenu: null };
        this.handleAddSymbol = () => this.props.onAddSymbols();
        this.handleRefresh = () => this.props.onRefresh();
        this.handlePrint = () => this.props.onPrint();
        this.handleDownload = () => this.props.onDownload();
        this.handleChangeColumn = (event, binding) => this.props.onHideField(binding, event.target.checked);
        this.renderCheckbox = option => (<Checkbox checked={option.visible} value={option.binding} onChange={event => this.handleChangeColumn(event, option.binding)}/>);
    }
    render() {
        const { columnsVisibilityMenu } = this.state;
        const { columns, section } = this.props;
        const column = columns[section];
        return (<div className="toolbar">
                <Row>
                    <Column>
                        <Typography className="caption" variant="caption">
                            Symbols
                        </Typography>
                        <Button color="inherit" onClick={this.handleAddSymbol}>
                            <PlayListIcon />
                            <span className="button-label">Symbols</span>
                        </Button>
                        <div>
                            <Button color="inherit" onClick={event => this.setState({ columnsVisibilityMenu: event.currentTarget })}>
                                <HideIcon />
                                <span className="button-label">Columns</span>
                            </Button>
                            <Menu anchorEl={columnsVisibilityMenu} open={Boolean(columnsVisibilityMenu)} onClose={() => this.setState({ columnsVisibilityMenu: null })}>
                                <div className="g_menu-inner">
                                    {column.map(option => Boolean(option.binding) && (<FormGroup key={option.binding}>
                                                    <FormControlLabel label={option.header} control={this.renderCheckbox(option)}/>
                                                </FormGroup>))}
                                </div>
                            </Menu>
                        </div>
                    </Column>
                    <Column shrink horizontalAlignment="right">
                        <Button color="inherit" onClick={this.handleRefresh}>
                            <RefreshIcon />
                            <span className="button-label">Refresh</span>
                        </Button>
                        <Button color="inherit" onClick={this.handlePrint}>
                            <PrintIcon />
                            <span className="button-label">Print</span>
                        </Button>
                        <Button color="inherit" onClick={this.handleDownload}>
                            <DownloadIcon />
                            <span className="button-label">Download</span>
                        </Button>
                    </Column>
                </Row>
            </div>);
    }
}
ToolBar.propTypes = {
    onAddSymbols: PropTypes.func.isRequired,
    onHideField: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onPrint: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    columns: PropTypes.shape({
        binding: PropTypes.string,
        header: PropTypes.string,
        visible: PropTypes.bool,
    }).isRequired,
    section: PropTypes.oneOf([
        AssetsTypes.OVERVIEW,
        AssetsTypes.PERFORMANCE,
        AssetsTypes.TECHNICAL,
    ]).isRequired,
};
export default ToolBar;
