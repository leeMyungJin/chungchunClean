import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// action creators
import * as appActionCreators from '../../actions/appActions';
import * as portfoliosActionCreators from '../../actions/portfoliosActions';
// components
import AddPortfolio from '../../components/AddPortfolio/AddPortfolio';
import AddSymbol from '../../components/AddSymbol/AddSymbol';
import AppBar from '../../components/AppBar/AppBar';
import EditPortfolio from '../../components/EditPortfolio/EditPortfolio';
import Settings from '../../components/Settings/Settings';
import Grid from '../../components/Grid/Grid';
import ToolBar from '../../components/ToolBar/ToolBar';
import TopBar from '../../components/TopBar/TopBar';
// utils
import * as wjUtils from '../../utils/wjUtils';
import AssetsTypes from "../../constants/AssetsTypes";
// css
import './App.css';
class App extends React.Component {
    constructor() {
        /* PROP TYPES AND DEFAULTS */
        super(...arguments);
        this.autoUpdateInterval = null;
        this.wjFlexGrid = null;
        this.autoUpdate = interval => {
            this.autoUpdateInterval = setInterval(() => {
                this.props.appActions.requestTradingData();
            }, interval);
        };
        /* RENDER ASSETS */
        // Render Navigation
        this.renderNavigation = () => {
            const { app, data, portfolios } = this.props; // reducers
            const { appActions } = this.props; // action creators
            return (<React.Fragment>
                <AppBar portfoliosList={portfolios.list} selectedPortfolio={portfolios.selected} isCollapsed={app.isSettingsPanelOpen} onAddPortfolio={appActions.openAddDialog} onEditPortfolios={appActions.openEditDialog} onChangeTab={appActions.changeCurrentPortfolio} onOpenSettings={appActions.toggleSettingsPanel}/>
                <TopBar onChangeFilterText={appActions.changeFilterText} onChangeTab={appActions.changeGridSection} selectedTab={app.gridSection} tabsList={[]} filter={data.filter}/>
                <Settings isOpen={app.isSettingsPanelOpen} settings={app.settings} onUpdateSettings={appActions.updateSettings} onClose={appActions.toggleSettingsPanel}/>
            </React.Fragment>);
        };
        // Render Dialogs
        this.renderDialogs = () => {
            const { app, data, portfolios } = this.props; // reducers
            const { appActions, portfoliosActions } = this.props; // action creators
            return (<React.Fragment>
                {app.isSymbolsDialogOpen && (<AddSymbol symbols={data.tickers} portfolio={portfolios.list.find(portfolio => portfolio.name === portfolios.selected)} onClose={appActions.closeSymbolsDialog} onSubmit={appActions.updateData}/>)}
                <AddPortfolio isOpen={app.isAddDialogOpen} onClose={appActions.closeAddDialog} onSubmit={portfoliosActions.addPortfolio} usedNames={portfolios.list.map(el => el.name)}/>
                <EditPortfolio isOpen={app.isEditDialogOpen} portfoliosList={portfolios.list} selectedPortfolio={portfolios.selected} onClose={appActions.closeEditDialog} onSelect={appActions.changeCurrentPortfolio} onDelete={portfoliosActions.deletePortfolio}/>
            </React.Fragment>);
        };
        // Render FlexGrid
        this.renderGrid = () => {
            const { app, data, appActions } = this.props;
            const filteredItemSource = data.filter
                ? data.trading.filter(entry => `${entry.name} ${entry.symbol}`.toLowerCase().includes(data.filter))
                : data.trading;
            return (<React.Fragment>
                <ToolBar columns={data.columns} section={app.gridSection} onAddSymbols={appActions.openSymbolsDialog} onDownload={() => wjUtils.pdf(this.wjFlexGrid.control)} onHideField={appActions.changeColumnsVisibility} onPrint={() => wjUtils.print(this.wjFlexGrid.control)} onRefresh={appActions.requestTradingData}/>
                <Grid filter={data.filter} columns={data.columns} section={app.gridSection} settings={app.settings} itemsSource={filteredItemSource} onUpdateReference={ref => {
                this.wjFlexGrid = ref;
            }}/>
            </React.Fragment>);
        };
    }
    /* THE COMPONENT LIFECYCLE */
    // Invoked immediately after a component is mounted
    componentDidMount() {
        const { app, appActions } = this.props;
        const { settings } = app;
        // request trading data
        appActions.requestTradingData();
        // auto-update the trading data (if configured)
        if (settings.isAutoUpdate) {
            this.autoUpdate(settings.updateInterval);
        }
    }
    // Invoked before a component rendering
    shouldComponentUpdate(nextProps) {
        const { settings } = this.props.app;
        const nextSettings = nextProps.app.settings;
        const hasNewInterval = settings.updateInterval !== nextSettings.updateInterval;
        const hasNewAutoUpdate = settings.isAutoUpdate !== nextSettings.isAutoUpdate;
        if (hasNewAutoUpdate || hasNewInterval) {
            clearInterval(this.autoUpdateInterval);
            if (nextSettings.isAutoUpdate) {
                this.autoUpdate(nextSettings.updateInterval);
            }
            else {
                clearInterval(this.autoUpdateInterval);
            }
        }
        return true;
    }
    // Called when a component is being removed from the DOM
    componentWillUnmount() {
        clearInterval(this.autoUpdateInterval);
    }
    render() {
        return (<div className="app">
                {this.renderNavigation()}
                <div className="app__content">
                    <div className="app__grid">
                        
                        {this.renderGrid()}
                    </div>
                </div>
                
                {this.renderDialogs()}
            </div>);
    }
}
App.propTypes = {
    // App Reducer
    app: PropTypes.shape({
        isAddDialogOpen: PropTypes.bool,
        isEditDialogOpen: PropTypes.bool,
        isSettingsPanelOpen: PropTypes.bool,
        isSymbolsDialogOpen: PropTypes.bool,
        settings: PropTypes.shape({
            isAutoUpdate: PropTypes.bool,
            isCustomCells: PropTypes.bool,
            isFreezeFirstCol: PropTypes.bool,
            isFreezeFirstRow: PropTypes.bool,
            updateInterval: PropTypes.number,
        }).isRequired,
    }).isRequired,
    // Data Reducer
    data: PropTypes.shape({
        columns: PropTypes.shape({
            [AssetsTypes.OVERVIEW]: PropTypes.array,
            [AssetsTypes.PERFORMANCE]: PropTypes.array,
            [AssetsTypes.TECHNICAL]: PropTypes.array,
        }),
        filter: PropTypes.string,
        tickers: PropTypes.array,
        trading: PropTypes.array,
    }).isRequired,
    // Portfolios Reducer
    portfolios: PropTypes.shape({
        list: PropTypes.array,
        selected: PropTypes.string,
    }).isRequired,
    // Portfolios Actions
    portfoliosActions: PropTypes.shape({
        addPortfolio: PropTypes.func,
        deletePortfolio: PropTypes.func,
        editPortfolio: PropTypes.func,
        getPortfolio: PropTypes.func,
        getPortfoliosList: PropTypes.func,
    }).isRequired,
    // App Actions
    appActions: PropTypes.shape({
        changeColumnsVisibility: PropTypes.func,
        changeCurrentPortfolio: PropTypes.func,
        changeFilterText: PropTypes.func,
        changeGridSection: PropTypes.func,
        closeAddDialog: PropTypes.func,
        closeEditDialog: PropTypes.func,
        closeSymbolsDialog: PropTypes.func,
        openAddDialog: PropTypes.func,
        openEditDialog: PropTypes.func,
        openSymbolsDialog: PropTypes.func,
        requestTradingData: PropTypes.func,
        toggleSettingsPanel: PropTypes.func,
        updateSettings: PropTypes.func,
        updateData: PropTypes.func,
    }).isRequired,
};
// Subscribe to Redux store updates.
// This means that any time the store is updated, mapStateToProps will be called
const mapStateToProps = state => ({
    app: state.app,
    data: state.data,
    portfolios: state.portfolios,
});
// Merge actions creators into the component’s props.
const mapDispatchToProps = dispatch => ({
    appActions: bindActionCreators(appActionCreators, dispatch),
    portfoliosActions: bindActionCreators(portfoliosActionCreators, dispatch),
});
// Connects the component to a Redux store.
// https://react-redux.js.org/api/connect
export default connect(mapStateToProps, mapDispatchToProps)(App);
