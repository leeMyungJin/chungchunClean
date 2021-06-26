import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Color, animate } from '@grapecity/wijmo';
import { InputColor } from '@grapecity/wijmo.react.input';
class App extends React.Component {
    constructor(props) {
        super(props);
        // update color gradient and start color animation
        this.interpolate = () => {
            let c1 = new Color(this.state.clrStart), c2 = new Color(this.state.clrEnd);
            // calculate new gradient
            let temp = [];
            for (let i = 0, cnt = 80; i < cnt; i++) {
                temp.push(Color.interpolate(c1, c2, i / cnt));
            }
            this.setState({ gradient: temp });
            // animate the color
            let theColor = document.querySelector("#theColor");
            clearInterval(this.state.interval);
            this.setState({
                interval: animate((pct) => {
                    theColor.style.background = Color.interpolate(c1, c2, pct).toString();
                }, 2000)
            });
        };
        this.state = {
            interval: null,
            gradient: [],
            clrStart: 'purple',
            clrEnd: 'red'
        };
    }
    // update color start/end
    setColor(value, start) {
        if (start) {
            this.setState({ clrStart: value });
        }
        else {
            this.setState({ clrEnd: value });
        }
        this.interpolate();
    }
    // perform initial color animation
    componentDidMount() {
        this.interpolate();
    }
    render() {
        return <div className="container-fluid">
            <div>
                <InputColor value={this.state.clrStart} valueChanged={s => this.setColor(s.value, true)}/>
                <InputColor value={this.state.clrEnd} valueChanged={s => this.setColor(s.value, false)}/>
            </div>
            <table>
                <tr>
                    {this.state.gradient.map((color, index) => {
            return <td style={{ backgroundColor: color }} key={index}>&nbsp;</td>;
        })}
                </tr>
            </table>
            <div id="theColor"></div>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
