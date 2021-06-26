// React
import * as React from 'react';
export class EsriCrosshair extends React.Component {
    constructor(props) {
        super(props);
        this.initializeStyles();
    }
    render() {
        return (<div>
        <div className="crosshair-circle-xs" style={this.styles.circles.xs}></div>
        <div className="crosshair-circle-sm" style={this.styles.circles.sm}></div>
        <div className="crosshair-circle-lg" style={this.styles.circles.lg}></div>
      </div>);
    }
    initializeStyles() {
        const divStyle = {
            position: 'absolute',
            pointerEvents: 'none'
        };
        const circleStyle = this.appendStyle({
            left: '50%',
            top: '50%',
        }, divStyle);
        this.styles = {
            circles: {
                xs: this.appendStyle({
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    borderRadius: 20,
                    backgroundColor: this.props.bgColor,
                    zIndex: 2,
                }, circleStyle),
                sm: this.appendStyle({
                    width: 40,
                    height: 40,
                    marginLeft: -20,
                    marginTop: -20,
                    borderRadius: 20,
                    backgroundColor: this.props.color,
                    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                }, circleStyle),
                lg: this.appendStyle({
                    width: 40,
                    height: 40,
                    marginLeft: -40,
                    marginTop: -40,
                    borderRadius: 100,
                    border: `20px solid ${this.props.bgColor}`,
                    boxSizing: 'content-box',
                    opacity: '0.25',
                    zIndex: 0,
                }, circleStyle)
            },
        };
    }
    appendStyle(base, style) {
        for (const key of Object.keys(style)) {
            base[key] = style[key];
        }
        return base;
    }
}
