import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComboBox } from '@grapecity/wijmo.react.input';
import { RadialGauge } from '@grapecity/wijmo.react.gauge';
import { ShowText, NeedleLength, RadialGauge as rg } from '@grapecity/wijmo.gauge';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: 'None',
            startAngles: [-90, -45, 0, 45, 90],
            startAngle: -45,
            sweepAngles: [-360, -270, -180, -90, 90, 180, 270, 360],
            sweepAngle: 270,
            tickSpacings: [20, 50, 100, 200, 250],
            tickSpacing: 50,
            needleShapes: 'None,Triangle,Diamond,Hexagon,Rectangle,Arrow,WideArrow,Pointer,WidePointer,Outer'.split(','),
            needleShape: 'Pointer',
            needleLengths: 'Outer,Middle,Inner'.split(','),
            needleLength: 'Middle'
        };
    }
    render() {
        return (<div className="container-fluid">
                <p>
                    Select one of the built-in needle shapes using the <b>needleShape</b> property:
                </p>
                <div className="row">
                    <div className="col-xs-4">
                        <label htmlFor="needle-shape">
                            needleShape
                        </label>
                        <ComboBox itemsSource={this.state.needleShapes} text={this.state.needleShape} textChanged={s => this.setState({
            needleShape: s.text,
            showText: s.text.match(/Outer|None/) ? ShowText.Value : ShowText.None
        })}/>
                        <br />
                        <label htmlFor="needle-length">
                            needleLength
                        </label>
                        <ComboBox itemsSource={this.state.needleLengths} text={this.state.needleLength} textChanged={s => this.setState({ needleLength: s.text })}/>
                        <br />
                        <label htmlFor="start">
                            startAngle
                        </label>
                        <ComboBox itemsSource={this.state.startAngles} selectedItem={this.state.startAngle} selectedIndexChanged={s => this.setState({ startAngle: s.selectedItem })}/>
                        <br />
                        <label htmlFor="sweep">
                            sweepAngle
                        </label>
                        <ComboBox itemsSource={this.state.sweepAngles} selectedItem={this.state.sweepAngle} selectedIndexChanged={s => this.setState({ sweepAngle: s.selectedItem })}/>
                        <br />
                        <label htmlFor="spacing">
                            tickSpacing
                        </label>
                        <ComboBox itemsSource={this.state.tickSpacings} selectedItem={this.state.tickSpacing} selectedIndexChanged={s => this.setState({ tickSpacing: s.selectedItem })}/>
                    </div>
                    <div className="col-xs-4">
                        <RadialGauge min={0} max={500} value={100} showText={this.state.showText} startAngle={this.state.startAngle} sweepAngle={this.state.sweepAngle} tickSpacing={this.state.tickSpacing} needleShape={this.state.needleShape} needleLength={this.state.needleLength} thickness={.2} showTicks={true} showTickText={true} isReadOnly={false}/>
                    </div>
                </div>

                <p>
                    Or create custom needle shapes with the <b>createNeedleElement</b> method:
                </p>
                <div className="row">
                    <div className="col-xs-4">
                        <RadialGauge thickness={.2} showText={ShowText.None} min={0} max={500} value={100} startAngle={-45} sweepAngle={270} showTicks={true} showTickText={true} tickSpacing={50} isReadOnly={false} needleLength={NeedleLength.Inner} needleElement={rg.createNeedleElement([
            { x: -35, y: 0 },
            { x: -35, y: 35 },
            { x: -30, y: 35 },
            { x: -20, y: 5 },
            { x: 60, y: 5 },
            { x: 100, y: 0 }
        ], 15)}/>
                    </div>
                    <div className="col-xs-4">
                        <RadialGauge thickness={.2} showText={ShowText.None} min={0} max={500} value={100} startAngle={-45} sweepAngle={270} showTicks={true} showTickText={true} tickSpacing={50} isReadOnly={false} needleLength={NeedleLength.Inner} needleElement={rg.createNeedleElement([
            { x: -10, y: 0 },
            { x: -10, y: 12 },
            { x: 0, y: 20 },
            { x: 35, y: 20 },
            { x: 50, y: 12 },
            { x: 10, y: 12 },
            { x: 10, y: 5 },
            { x: 80, y: 5 },
            { x: 100, y: 0 }
        ])}/>
                    </div>
                    <div className="col-xs-4">
                        <RadialGauge thickness={.2} showText={ShowText.Value} min={0} max={500} value={100} startAngle={-45} sweepAngle={270} showTicks={true} showTickText={true} tickSpacing={50} isReadOnly={false} needleLength={NeedleLength.Inner} needleElement={rg.createNeedleElement([
            { x: 40, y: 15 },
            { x: 90, y: 0 }
        ])}/>
                    </div>
                </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
