import './license';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { setLicenseKey } from '@grapecity/wijmo';
// polyfills
import 'whatwg-fetch';
import 'core-js';
// global CSS
import './index.css';
import '@grapecity/wijmo.styles/wijmo.css';
import configureStore from './store/configureStore';
import App from './routes/App/App';
setLicenseKey('GrapeCity,*.wijmo.com|*.grapecity.com,E255246575581915#B0hNLbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPRhEdutidxpHSixmN5MXTwc4ZNVlY7o6UTZGRqhWbyQDanlUOKFlQCZTSxlTWMpWaFt6KIB5TlZHap96dqd6RLhXOTZjamBTezkjcwYVT986TulVNtBHc7gFaaBHeUhzRQJmQaJUc83yZGRmRmVjb55UWN3GaltycSJHOVVkdycjTrYGTFRnYElHMz44LiRnY9JENrYENuRVb6lUTzkGVxdjUBJndJlkeRRlVqFkbtJXSUF4TUp4SGVjdvh4R4JURu9GcOFTcm5kVP3CSBJUZQR5Uv4ke9dXQsdDVs9WZUNEdy46Ull5R7Y7V5NFcHF6RJdlcxljQz5EZoZVc6p4K4NGRJFlZzAVQMd7SQlmN5JUTqBVdldmcKlnb6okdrpWMQZXVN3kQYhkarU4dwVWbuhldXhkajhlVl3WTix4TWBjaUNEMwk4R9UDcZd5UM3Gdt3CaZ36TiojITJCLiATO6AjREljMiojIIJCL5UTO7kjN9kTM0IicfJye#4Xfd5nIJBjMSJiOiMkIsIibvl6cuVGd8VEIgQXZlh6U8VGbGBybtpWaXJiOi8kI1xSfiUTSOFlI0IyQiwiIu3Waz9WZ4hXRgAicldXZpZFdy3GclJFIv5mapdlI0IiTisHL3JyS7gDSiojIDJCLi86bpNnblRHeFBCI73mUpRHb55EIv5mapdlI0IiTisHL3JCNGZDRiojIDJCLi86bpNnblRHeFBCIQFETPBCIv5mapdlI0IiTisHL3JyMDBjQiojIDJCLiUmcvNEIv5mapdlI0IiTisHL3JSV8cTQiojIDJCLi86bpNnblRHeFBCI4JXYoNEbhl6YuFmbpZEIv5mapdlI0IiTis7W0ICZyBlIsIyMxYTM6ADI5AzNwgTMwIjI0ICdyNkIsISbvNmL9RXajVGchJ7ZuoCLt36Yu2Wbql6duoiI0IyctRkIsIibv9mbhJEIzlmcoNkI0ISYONkIsUWdyRnOiwmdFJCLiUTM9EDO5UzN5YDNyUTNyIiOiQWSiwSfiIjd9EDMyIiOiIXZcJ5L');
const store = configureStore({});
const theme = createMuiTheme({}); // https://material-ui.com/customization/theming/
ReactDOM.render(<Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>, document.getElementById('app'));
