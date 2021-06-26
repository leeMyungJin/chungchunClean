import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjInput from '@grapecity/wijmo.react.input';
//
import { getMusicians, getPalettes } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thePalette: 'Standard',
            palettes: getPalettes(),
            musicians: []
        };
        const musicianNames = getMusicians();
        for (let i = 0; i < musicianNames.length; i++) {
            let item = {
                id: i,
                name: musicianNames[i],
                photo: '|Paul|John|George|Ringo|'
                    .indexOf('|' + musicianNames[i] + '|') >= 0
                    ? 'resources/' + musicianNames[i] + '.png'
                    : null
            };
            this.setState({
                musicians: this.state.musicians.push(item)
            });
        }
    }
    menuItemClicked(menu) {
        alert(`You selected option **${menu.selectedIndex}** from menu **${menu.header}**`);
    }
    render() {
        return <div className="container-fluid">
            <p>
                This Menu is bound to an array of items' data using the <b>itemsSource</b> property,
                and customizes items content using a <b>wjItemTemplate</b> <i>render prop</i>.
            </p>
            <div className="form-group">
                <wjInput.Menu header="Artists" itemClicked={this.menuItemClicked} itemsSource={this.state.musicians} wjItemTemplate={(context) => (<div style={{ minWidth: '160px' }}>
                            {context.itemIndex + 1}. <b>{context.item.name}</b>
                            {context.item.photo ?
            <div>
                                <img src={context.item.photo} height="50"/>
                            </div>
            : null}
                        </div>)}>
                </wjInput.Menu>
            </div>
            
            <p>
                For this Menu we generate an array of <b>MenuItem</b> components with custom
                item content, using the Array <b>map</b> function iterating through an array 
                of palette data.
            </p>
            <div className="form-group">
                <wjInput.Menu header="Palette" value={this.state.thePalette}>
                    {this.state.palettes.map((value) => {
            return <wjInput.MenuItem value={value.name}>
                            {value.name}
                            <span style={{ float: 'right' }}>
                            {value.colors.map((color) => {
                return <div style={{
                    backgroundColor: color,
                    display: 'inline',
                    padding: '2px',
                    height: '10px',
                    width: '3px'
                }}>
                                </div>;
            })}
                            </span>
                        </wjInput.MenuItem>;
        })}
                </wjInput.Menu>
            </div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
