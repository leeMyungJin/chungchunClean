import { default as createReducer } from '../utils/createReducer';
import { default as Action } from '../constants/ActionTypes';
import { default as Assets } from '../constants/AssetsTypes';
const initialState = {
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    isSettingsPanelOpen: false,
    isSymbolsDialogOpen: false,
    gridSection: Assets.OVERVIEW,
    settings: {
        isAutoUpdate: true,
        isCustomCells: true,
        isFreezeFirstCol: false,
        isFreezeFirstRow: false,
        rowHeight: 60,
        updateInterval: 30000,
    },
};
/**
 * App Reducers
 */
export default createReducer(initialState, {
    [Action.OPEN_ADD_DIALOG]: state => (Object.assign({}, state, { isAddDialogOpen: true })),
    [Action.CLOSE_ADD_DIALOG]: state => (Object.assign({}, state, { isAddDialogOpen: false })),
    [Action.OPEN_EDIT_DIALOG]: state => (Object.assign({}, state, { isEditDialogOpen: true })),
    [Action.CLOSE_EDIT_DIALOG]: state => (Object.assign({}, state, { isEditDialogOpen: false })),
    [Action.OPEN_SYMBOLS_DIALOG]: state => (Object.assign({}, state, { isSymbolsDialogOpen: true })),
    [Action.CLOSE_SYMBOLS_DIALOG]: state => (Object.assign({}, state, { isSymbolsDialogOpen: false })),
    [Action.TOGGLE_SETTINGS_PANEL]: state => (Object.assign({}, state, { isSettingsPanelOpen: !state.isSettingsPanelOpen })),
    [Action.CHANGE_GRID_SECTION]: (state, payload) => (Object.assign({}, state, { gridSection: payload })),
    [Action.UPDATE_SETTINGS]: (state, payload) => (Object.assign({}, state, { settings: Object.assign({}, state.settings, payload) })),
});
