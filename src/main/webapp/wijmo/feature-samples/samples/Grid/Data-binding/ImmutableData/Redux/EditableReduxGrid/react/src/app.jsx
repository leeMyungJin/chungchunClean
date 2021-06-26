import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
//React/Redux
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//Application
import { appReducer } from './reducers';
import { GridViewContainer } from './GridViewContainer';
// Create global Redux Store
const store = createStore(appReducer);
class App extends React.Component {
    render() {
        return <Provider store={store}>
            <GridViewContainer />
          </Provider>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
