import { combineReducers } from 'redux';
import { default as app } from './app';
import { default as data } from './data';
import { default as portfolios } from './portfolios';
// Turns an object whose values are different reducing functions into a single reducing function
// https://redux.js.org/api/combinereducers
const rootReducer = combineReducers({
    app,
    portfolios,
    data,
});
export default rootReducer;
