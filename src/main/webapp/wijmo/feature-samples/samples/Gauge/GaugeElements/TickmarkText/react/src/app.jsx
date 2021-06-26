import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RadialGauge, LinearGauge } from '@grapecity/wijmo.react.gauge';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { GaugeDirection } from '@grapecity/wijmo.gauge';
class App extends React.Component {
    // initialize state
    constructor(props) {
        super(props);
        // arrays used to populate combo boxes
        this.startAngles = [-90, -45, 0, 45, 90];
        this.sweepAngles = [-360, -270, -180, -90, 90, 180, 270, 360];
        this.tickSpacings = [25, 50, 100, 200, 250];
        this.directions = ['Left', 'Right', 'Up', 'Down'];
        this.state = {
            startAngle: this.startAngles[1],
            sweepAngle: this.sweepAngles[6],
            tickSpacing: this.tickSpacings[1],
            direction: GaugeDirection.Right
        };
    }
    render() {
        return (<div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <RadialGauge style={{ height: '200px' }} min={0} max={500} value={100} showTicks={true} showTickText={true} showText={'Value'} isReadOnly={false} startAngle={this.state.startAngle} sweepAngle={this.state.sweepAngle} tickSpacing={this.state.tickSpacing}>
                        </RadialGauge>
                    </div>
                    <div className="col-xs-6">
                        <label>
                            startAngle{' '}
                            <ComboBox itemsSource={this.startAngles} selectedItem={this.state.startAngle} selectedIndexChanged={sender => {
            this.setState({ startAngle: sender.selectedItem });
        }}>
                            </ComboBox>
                        </label>
                        <label>
                            sweepAngle{' '}
                            <ComboBox itemsSource={this.sweepAngles} selectedItem={this.state.sweepAngle} selectedIndexChanged={sender => {
            this.setState({ sweepAngle: sender.selectedItem });
        }}>
                            </ComboBox>
                        </label>
                        <label>
                            tickSpacing{' '}
                            <ComboBox itemsSource={this.tickSpacings} selectedItem={this.state.tickSpacing} selectedIndexChanged={sender => {
            this.setState({ tickSpacing: sender.selectedItem });
        }}>
                            </ComboBox>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className={'col-xs-6' + (this.isVertical() ? ' vertical' : '')}>
                        <LinearGauge min={0} max={500} value={100} showTicks={true} showTickText={true} isReadOnly={false} direction={this.state.direction} tickSpacing={this.state.tickSpacing}>
                        </LinearGauge>
                    </div>
                    <div className="col-xs-6">
                        <label>
                            direction{' '}
                            <ComboBox itemsSource={this.directions} selectedItem={GaugeDirection[this.state.direction]} selectedIndexChanged={sender => {
            this.setState({ direction: GaugeDirection[sender.selectedItem] });
        }}>
                            </ComboBox>
                        </label>
                    </div>
                </div>
            </div>);
    }
    // used to style the linear gauge
    isVertical() {
        return GaugeDirection[this.state.direction].match(/Up|Down/) != null;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
