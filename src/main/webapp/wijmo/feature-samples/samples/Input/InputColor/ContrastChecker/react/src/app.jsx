import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import { InputColor } from '@grapecity/wijmo.react.input';
import { Color, Globalize } from '@grapecity/wijmo';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        let fore = 'black';
        let back = 'white';
        this.state = {
            fore: fore,
            back: back,
            ratio: this.getRatio(fore, back)
        };
    }
    getRatio(fore, back) {
        let lFore = this.getRelativeLuminance(fore);
        let lBack = this.getRelativeLuminance(back);
        return (Math.max(lFore, lBack) + .05) / (Math.min(lFore, lBack) + 0.05);
    }
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance
    getRelativeLuminance(color) {
        let c = new Color(color);
        let r = this.getChannel(c.r);
        let g = this.getChannel(c.g);
        let b = this.getChannel(c.b);
        return (r * 0.2126 + g * 0.7152 + b * 0.0722);
    }
    getChannel(rgb) {
        rgb /= 255;
        return rgb <= 0.03928
            ? rgb / 12.92
            : Math.pow((rgb + 0.055) / 1.055, 2.4);
    }
    render() {
        return <div className="container-fluid">
            <h1>
                Contrast Checker
            </h1>
            <div className="row">
                <div className="col-md-4">
                    <h3>
                        Foreground Color
                    </h3>
                    <InputColor value={this.state.fore} valueChanged={s => this.setState({
            fore: s.value,
            ratio: this.getRatio(s.value, this.state.back)
        })}/>
                    <h3>
                        Background Color
                    </h3>
                    <InputColor value={this.state.back} valueChanged={s => this.setState({
            back: s.value,
            ratio: this.getRatio(this.state.fore, s.value)
        })}/>
                </div>
                <div className="col-md-4">
                    <h3>
                        Contrast Ratio
                    </h3>
                    <div id="ratio" style={{ 'borderColor': this.state.ratio < 7 ? 'whitesmoke' : 'darkgreen' }}>
                        <b>{Globalize.format(this.state.ratio, 'g1')}</b>:1
                    </div>
                    <h3>
                        Result
                    </h3>
                    <p className="sample" style={{ 'color': this.state.fore, 'background': this.state.back }}>
                        Normal Text
                    </p>
                    <p>
                        WCAG AA:&nbsp;
                        <span id="aa-normal" className={'result' + (this.state.ratio < 4.5 ? ' fail' : '')}>
                            {this.state.ratio < 4.5 ? 'Fail' : 'Pass'}
                        </span>
                        WCAG AAA:&nbsp;
                        <span id="aaa-normal" className={'result' + (this.state.ratio < 7 ? ' fail' : '')}>
                            {this.state.ratio < 7 ? 'Fail' : 'Pass'}
                        </span>
                    </p>
                    <p className="sample large" style={{ 'color': this.state.fore, 'background': this.state.back }}>
                        Large Text
                    </p>
                    <p>
                        WCAG AA:&nbsp;
                        <span id="aa-large" className={'result' + (this.state.ratio < 3 ? ' fail' : '')}>
                            {this.state.ratio < 3 ? 'Fail' : 'Pass'}
                        </span>
                        WCAG AAA:&nbsp;
                        <span id="aaa-large" className={'result' + (this.state.ratio < 4.5 ? ' fail' : '')}>
                            {this.state.ratio < 4.5 ? 'Fail' : 'Pass'}
                        </span>
                    </p>
                </div>
            </div>
            <h3>
                Explanation
            </h3>
            <p>
                WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and
                3:1 for large text.
            </p>
            <p>
                WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface
                components (such as form input borders).
            </p>
            <p>
                WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 
                for large text.
            </p>
            <p>
                For more details, please see
                <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance" target="_blank">
                    The Science of Color Contrast
                </a>.
            </p>
        </div>;
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
