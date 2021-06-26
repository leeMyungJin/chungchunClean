// React
import * as React from 'react';
export class GdashSlider extends React.Component {
    constructor() {
        super(...arguments);
        this.data = {
            position: 0,
            value: 0
        };
    }
    render() {
        this.updateData();
        const markerStyle = {
            background: this.props.color,
            textAlign: 'center',
            borderRadius: 25,
            width: 25,
            height: 25,
            lineHeight: '25px',
            position: 'relative',
            top: -23,
            fontSize: '0.75rem',
            left: this.data.position
        };
        return (<div style={{ height: 26 }}>
        <div style={{ width: '100%', height: 1, backgroundColor: '#d8dfe1', position: 'relative', top: '50%' }}>
          <div style={{ textAlign: 'center', borderRadius: 5, width: 10, height: 10, backgroundColor: '#d2d1cf', position: 'relative', left: '50%', top: -5 }}></div>
          <div className="marker" style={markerStyle}>
            {this.props.value}
          </div>
        </div>
      </div>);
    }
    updateData() {
        const value = this.props.value;
        if (value !== this.data.value) {
            this.data.position = this.calculatePosition(value);
            this.data.value = value;
        }
    }
    calculatePosition(value) {
        // calculate slider position (as a percentage)
        let position = Math.log(value / 100);
        position = Math.min(Math.max(position, -1.5), +1.5);
        position = (position + 1.5) / 3;
        // convert to pixels
        return position * 230 - 15;
    }
}
