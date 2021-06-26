import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Tabs, Tab, IconButton, Typography } from '@material-ui/core';
import { Settings as SettingsIcon, Menu as MenuIcon, Add as AddIcon, } from '@material-ui/icons';
// components
import { default as Row } from '../../components/Row/Row';
import { default as Column } from '../../components/Column/Column';
// css
import './AppBar.css';
class AppBar extends React.Component {
    constructor() {
        super(...arguments);
        // Event Handlers
        this.handleOpenAddDialog = () => this.props.onAddPortfolio();
        this.handleOpenEditDialog = () => this.props.onEditPortfolios();
        this.handleOpenSettings = () => this.props.onOpenSettings();
        this.handleChangeTab = (event, value) => this.props.onChangeTab(value);
        this.renderButton = actions => (<React.Fragment>
            {actions.map(action => (<IconButton className="icon-button" color="inherit" key={action.key} aria-label={action.label} onClick={action.handler}>
                    {action.icon}
                </IconButton>))}
        </React.Fragment>);
    }
    render() {
        const { selectedPortfolio, portfoliosList, isCollapsed } = this.props;
        const mainActions = [
            { key: 'add', label: 'Add a portfolio', handler: this.handleOpenAddDialog, icon: <AddIcon /> },
            { key: 'edit', label: 'Edit portfolios', handler: this.handleOpenEditDialog, icon: <MenuIcon /> },
        ];
        const additionalActions = [
            { key: 'settings', label: 'Settings', handler: this.handleOpenSettings, icon: <SettingsIcon /> },
        ];
        return (<div className={`app-bar ${isCollapsed ? 'app-bar_collapsed' : ''}`}>
                <Row>
                    <Column shrink>
                        <Typography className="title" variant="h6" color="inherit">
                            Portfolio & Watchlist
                        </Typography>
                        {this.renderButton(mainActions)}
                    </Column>
                    <Column>
                        <Tabs variant="scrollable" className="tabs" scrollButtons="auto" indicatorColor="primary" textColor="inherit" classes={{ indicator: 'tabs-indicator' }} onChange={this.handleChangeTab} value={selectedPortfolio}>
                            {portfoliosList.map(portfolio => (<Tab classes={{ root: 'tab' }} key={portfolio.name} label={portfolio.name} value={portfolio.name}/>))}
                        </Tabs>
                    </Column>
                    <Column shrink horizontalAlignment="right">
                        {this.renderButton(additionalActions)}
                    </Column>
                </Row>
            </div>);
    }
}
AppBar.propTypes = {
    isCollapsed: PropTypes.bool,
    onAddPortfolio: PropTypes.func.isRequired,
    onEditPortfolios: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onOpenSettings: PropTypes.func.isRequired,
    selectedPortfolio: PropTypes.string.isRequired,
    portfoliosList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        symbols: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
};
AppBar.defaultProps = {
    isCollapsed: false,
};
export default AppBar;
