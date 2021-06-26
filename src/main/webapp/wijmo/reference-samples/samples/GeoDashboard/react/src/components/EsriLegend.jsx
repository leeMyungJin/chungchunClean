// React
import * as React from 'react';
export class EsriLegend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: null
        };
    }
    render() {
        const source = this.state.source;
        if (!source) {
            return null;
        }
        const legends = source.legends.map((legend, index) => {
            const divStyle = {
                margin: '0 .75rem 0 0',
                width: '1rem',
                height: '1rem',
                display: 'inline-block',
                backgroundColor: legend.color
            };
            return (<div key={index} className="legend-item">
            <div style={divStyle}></div>
            {legend.label}
        </div>);
        });
        return (<div className="legend-list" style={{ display: source ? '' : 'none' }}>
        {legends}
      </div>);
    }
    setSource(value) {
        this.setState({
            source: value
        });
    }
}
