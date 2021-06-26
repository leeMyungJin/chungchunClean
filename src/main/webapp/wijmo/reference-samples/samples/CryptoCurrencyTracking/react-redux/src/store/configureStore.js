import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { default as thunk } from 'redux-thunk';
import { default as reducer } from '../reducers/index';
/**
 * Creates a redux store with middleware and reducers using an initial state
 * @param  {object} initialState - Initial state for the store
 * @return {object} store - The created store
 */
export default function configureStore(initialState) {
    // Redux DevTools Extension. Hot Reloading with Time Travel helps to boost
    // the developer’s productivity significantly and makes the development fun.
    // https://github.com/zalmoxisus/redux-devtools-extension
    const composeEnhancers = composeWithDevTools({});
    const enhancer = composeEnhancers(
    // Middleware is the suggested way to extend Redux with custom functionality.
    // Middleware lets you wrap the store's dispatch method for fun and profit.
    // https://redux.js.org/api/applymiddleware
    applyMiddleware(
    // Redux Thunk middleware allows you to write action creators that return a function instead of an action.
    // The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
    // The inner function receives the store methods dispatch and getState as parameters.
    // https://github.com/reduxjs/redux-thunk
    thunk
    // other middleware if any
    ));
    return createStore(reducer, initialState, enhancer);
}
