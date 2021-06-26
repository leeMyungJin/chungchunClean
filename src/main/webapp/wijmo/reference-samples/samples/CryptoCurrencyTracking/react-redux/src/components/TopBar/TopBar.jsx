import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Tabs, Tab, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
// components
import { default as Row } from '../../components/Row/Row';
import { default as Column } from '../../components/Column/Column';
import { default as AssetsTypes } from '../../constants/AssetsTypes';
// css
import './TopBar.css';
class TopBar extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChangeFilterText = str => this.props.onChangeFilterText(str);
        this.handleChangeTab = (event, value) => this.props.onChangeTab(value);
        this.renderTabs = () => {
            const tabs = [
                { label: 'Overview', value: AssetsTypes.OVERVIEW },
                { label: 'Technical', value: AssetsTypes.TECHNICAL },
                { label: 'Performance', value: AssetsTypes.PERFORMANCE },
            ];
            return (<Tabs className="tabs" textColor="inherit" classes={{ indicator: 'tabs-indicator' }} value={this.props.selectedTab} onChange={this.handleChangeTab}>
                {tabs.map(tab => (<Tab classes={{ root: 'tab' }} key={tab.value} label={tab.label} value={tab.value}/>))}
            </Tabs>);
        };
        this.renderFilterBox = () => {
            const { filter } = this.props;
            return (<div className="filter">
                <div className="filter__search-icon">
                    <SearchIcon />
                </div>
                <input className="filter__input" placeholder="Type a symbol name to filter" value={filter} onChange={event => this.handleChangeFilterText(event.target.value.toLowerCase())}/>
                {Boolean(filter) && (<IconButton className="filter__clear-icon" onClick={() => this.handleChangeFilterText('')}>
                        <CloseIcon />
                    </IconButton>)}
            </div>);
        };
    }
    render() {
        return (<div className="topbar">
                <Row verticalAlignment="stretch">
                    <Column verticalAlignment="stretch">{this.renderTabs()}</Column>
                    <Column shrink>{this.renderFilterBox()}</Column>
                </Row>
            </div>);
    }
}
TopBar.propTypes = {
    filter: PropTypes.string.isRequired,
    onChangeFilterText: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.oneOf([
        AssetsTypes.OVERVIEW,
        AssetsTypes.PERFORMANCE,
        AssetsTypes.TECHNICAL,
    ]).isRequired,
};
export default TopBar;
