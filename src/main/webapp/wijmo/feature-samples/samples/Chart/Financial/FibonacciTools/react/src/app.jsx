import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjChart from '@grapecity/wijmo.chart';
import * as Input from '@grapecity/wijmo.react.input';
import * as Finance from '@grapecity/wijmo.react.chart.finance';
import * as Analytics from '@grapecity/wijmo.react.chart.finance.analytics';
import { getData } from './data';
//
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                '<table>' +
                '<tr><td>high</td><td>{high:c}</td><tr/>' +
                '<tr><td>low</td><td>{low:c}</td><tr/>' +
                '<tr><td>open</td><td>{open:c}</td><tr/>' +
                '<tr><td>close</td><td>{close:c}</td><tr/>' +
                '</table>',
            selectedFib: 'retracements',
            uptrend: 'True',
            properties: {
                retracements: {
                    labelPosition: 'Left',
                    uptrend: true,
                },
                arcs: {
                    labelPosition: 'Top',
                    start: new wjChart.DataPoint(46, 19.75),
                    end: new wjChart.DataPoint(54, 17.1)
                },
                fans: {
                    labelPosition: 'Top',
                    start: new wjChart.DataPoint(10, 18.12),
                    end: new wjChart.DataPoint(32, 20.53)
                },
                timeZones: {
                    labelPosition: 'Right',
                    startX: 0,
                    endX: 3
                }
            }
        };
    }
    render() {
        return <div className="container-fluid">
            <div className="panel-group" id="settings">
                <div className="panel panel-default">
                    <div id="settingsBody" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <ul className="list-inline">
                                <li>
                                    <Input.Menu header="Type" value={this.state.selectedFib} itemClicked={this.typeClick.bind(this)}>
                                        <Input.MenuItem value="arcs">Arcs</Input.MenuItem>
                                        <Input.MenuItem value="fans">Fans</Input.MenuItem>
                                        <Input.MenuItem value="retracements">Retracements</Input.MenuItem>
                                        <Input.MenuItem value="timeZones">Time Zones</Input.MenuItem>
                                    </Input.Menu>
                                </li>
                            </ul>

                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'retracements' ? "block" : "none" }}>
                                <li>
                                    <Input.Menu header="Uptrend" value={this.state.properties.retracements.uptrend} itemClicked={this.uptrendChanged.bind(this)}>
                                        <Input.MenuItem value={true}>True</Input.MenuItem>
                                        <Input.MenuItem value={false}>False</Input.MenuItem>
                                    </Input.Menu>
                                </li>

                                <li>
                                    <Input.Menu header="Label Position" value={this.state.properties.retracements.labelPosition} itemClicked={this.rlpChanged.bind(this)}>
                                        <Input.MenuItem value="Left">Left</Input.MenuItem>
                                        <Input.MenuItem value="Center">Center</Input.MenuItem>
                                        <Input.MenuItem value="Right">Right</Input.MenuItem>
                                    </Input.Menu>
                                </li>
                            </ul>

                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'arcs' ? "block" : "none" }}>
                                <Input.Menu header="Label Position" value={this.state.properties.arcs.labelPosition} itemClicked={this.alpChanged.bind(this)}>
                                    <Input.MenuItem value="None">None</Input.MenuItem>
                                    <Input.MenuItem value="Top">Top</Input.MenuItem>
                                    <Input.MenuItem value="Center">Center</Input.MenuItem>
                                    <Input.MenuItem value="Bottom">Bottom</Input.MenuItem>
                                </Input.Menu>
                            </ul>
                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'arcs' ? "block" : "none" }}>
                                <li>
                                    <label>Start X</label>
                                        <Input.InputNumber value={this.state.properties.arcs.start.x} step={1} valueChanged={this.asxChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                                <li>
                                    <label>Start Y</label>
                                        <Input.InputNumber value={this.state.properties.arcs.start.y} step={1} valueChanged={this.asyChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                            </ul>
                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'arcs' ? "block" : "none" }}>
                                <li>
                                    <label>End X</label>
                                        <Input.InputNumber value={this.state.properties.arcs.end.x} step={1} valueChanged={this.aexChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                                <li>
                                    <label>End Y</label>
                                        <Input.InputNumber value={this.state.properties.arcs.end.y} step={1} valueChanged={this.aeyChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                            </ul>

                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'fans' ? "block" : "none" }}>
                                <Input.Menu header="Label Position" value={this.state.properties.fans.labelPosition} itemClicked={this.flpChanged.bind(this)}>
                                    <Input.MenuItem value="None">None</Input.MenuItem>
                                    <Input.MenuItem value="Top">Top</Input.MenuItem>
                                    <Input.MenuItem value="Center">Center</Input.MenuItem>
                                    <Input.MenuItem value="Bottom">Bottom</Input.MenuItem>
                                </Input.Menu>
                            </ul>
                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'fans' ? "block" : "none" }}>
                                <li>
                                    <label>Start X</label>
                                        <Input.InputNumber value={this.state.properties.fans.start.x} step={1} valueChanged={this.fsxChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                                <li>
                                    <label>Start Y</label>
                                        <Input.InputNumber value={this.state.properties.fans.start.y} step={1} valueChanged={this.fsyChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                            </ul>
                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'fans' ? "block" : "none" }}>
                                <li>
                                    <label>End X</label>
                                        <Input.InputNumber value={this.state.properties.fans.end.x} step={1} valueChanged={this.fexChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                                <li>
                                    <label>End Y</label>
                                        <Input.InputNumber value={this.state.properties.fans.end.y} step={1} valueChanged={this.feyChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                            </ul>

                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'timeZones' ? "block" : "none" }}>
                                <Input.Menu header="Label Position" value={this.state.properties.timeZones.labelPosition} itemClicked={this.tlpChanged.bind(this)}>
                                    <Input.MenuItem value="None">None</Input.MenuItem>
                                    <Input.MenuItem value="Left">Left</Input.MenuItem>
                                    <Input.MenuItem value="Center">Center</Input.MenuItem>
                                    <Input.MenuItem value="Right">Right</Input.MenuItem>
                                </Input.Menu>
                            </ul>
                            <ul className="list-inline" style={{ display: this.state.selectedFib === 'timeZones' ? "block" : "none" }}>
                                <li>
                                    <label>Start X</label>
                                        <Input.InputNumber value={this.state.properties.timeZones.startX} step={1} valueChanged={this.tsxChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                                <li>
                                    <label>End X</label>
                                        <Input.InputNumber value={this.state.properties.timeZones.endX} step={1} valueChanged={this.texChanged.bind(this)}>
                                        </Input.InputNumber>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Finance.FinancialChart itemsSource={this.state.data} bindingX="date" symbolSize={6} tooltipContent="tooltip" chartType="Candlestick" initialized={this.initializeChart.bind(this)}>
                <Finance.FinancialChartSeries binding="high,low,open,close" name="Box Inc"></Finance.FinancialChartSeries>
                <Analytics.FlexChartFibonacci binding="close" symbolSize={1} name="Retracements" 
        // style= "fill: 'red', stroke: 'red', strokeWidth:0.5, fontSize:10"
        labelPosition={this.state.properties.retracements.labelPosition} uptrend={this.state.properties.retracements.uptrend} visibility={this.state.selectedFib === 'retracements' ? 'Visible' : 'Hidden'}>
                </Analytics.FlexChartFibonacci>

                <Analytics.FlexChartFibonacciArcs binding="close" name="Arcs" start={this.state.properties.arcs.start} end={this.state.properties.arcs.end} labelPosition={this.state.properties.arcs.labelPosition} visibility={this.state.selectedFib === 'arcs' ? 'Visible' : 'Hidden'}>
                </Analytics.FlexChartFibonacciArcs>

                <Analytics.FlexChartFibonacciFans binding="close" name="Fans" start={this.state.properties.fans.start} end={this.state.properties.fans.end} labelPosition={this.state.properties.fans.labelPosition} visibility={this.state.selectedFib === 'fans' ? 'Visible' : 'Hidden'}>
                </Analytics.FlexChartFibonacciFans>

                <Analytics.FlexChartFibonacciTimeZones binding="close" name="TimeZones" startX={this.state.properties.timeZones.startX} endX={this.state.properties.timeZones.endX} labelPosition={this.state.properties.timeZones.labelPosition} visibility={this.state.selectedFib === 'timeZones' ? 'Visible' : 'Hidden'}>
                </Analytics.FlexChartFibonacciTimeZones>
            </Finance.FinancialChart>

        </div>;
    }
    initializeChart(flex) {
        this.theChart = flex;
    }
    typeClick(menu) {
        if (menu.selectedItem != null) {
            this.setState({
                selectedFib: menu.selectedValue
            });
        }
    }
    uptrendChanged(menu) {
        if (menu.selectedItem != null) {
            this.setState({
                uptrend: menu.selectedValue,
                properties: {
                    retracements: {
                        labelPosition: this.state.properties.retracements.labelPosition,
                        uptrend: menu.selectedValue,
                    },
                    arcs: this.state.properties.arcs,
                    fans: this.state.properties.fans,
                    timeZones: this.state.properties.timeZones
                }
            });
        }
    }
    rlpChanged(menu) {
        if (menu.selectedValue != null) {
            this.setState({
                properties: {
                    retracements: {
                        labelPosition: menu.selectedValue,
                        uptrend: this.state.properties.retracements.uptrend
                    },
                    arcs: this.state.properties.arcs,
                    fans: this.state.properties.fans,
                    timeZones: this.state.properties.timeZones
                }
            });
        }
    }
    alpChanged(menu) {
        if (menu.selectedValue != null) {
            this.setState({
                properties: {
                    retracements: this.state.properties.retracements,
                    arcs: {
                        labelPosition: menu.selectedValue,
                        start: this.state.properties.arcs.start,
                        end: this.state.properties.arcs.end
                    },
                    fans: this.state.properties.fans,
                    timeZones: this.state.properties.timeZones
                }
            });
        }
    }
    asxChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                arcs: {
                    labelPosition: this.state.properties.arcs.labelPosition,
                    start: new wjChart.DataPoint(input.value, this.state.properties.arcs.start.y),
                    end: this.state.properties.arcs.end
                },
                fans: this.state.properties.fans,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    asyChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                arcs: {
                    labelPosition: this.state.properties.arcs.labelPosition,
                    start: new wjChart.DataPoint(this.state.properties.arcs.start.x, input.value),
                    end: this.state.properties.arcs.end
                },
                fans: this.state.properties.fans,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    aexChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                arcs: {
                    labelPosition: this.state.properties.arcs.labelPosition,
                    start: this.state.properties.arcs.start,
                    end: new wjChart.DataPoint(input.value, this.state.properties.arcs.end.y)
                },
                fans: this.state.properties.fans,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    aeyChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                arcs: {
                    labelPosition: this.state.properties.arcs.labelPosition,
                    start: this.state.properties.arcs.start,
                    end: new wjChart.DataPoint(this.state.properties.arcs.end.x, input.value)
                },
                fans: this.state.properties.fans,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    flpChanged(menu) {
        if (menu.selectedValue != null) {
            this.setState({
                properties: {
                    retracements: this.state.properties.retracements,
                    fans: {
                        labelPosition: menu.selectedValue,
                        start: this.state.properties.fans.start,
                        end: this.state.properties.fans.end
                    },
                    arcs: this.state.properties.arcs,
                    timeZones: this.state.properties.timeZones
                }
            });
        }
    }
    fsxChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: {
                    labelPosition: this.state.properties.fans.labelPosition,
                    start: new wjChart.DataPoint(input.value, this.state.properties.fans.start.y),
                    end: this.state.properties.fans.end
                },
                arcs: this.state.properties.arcs,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    fsyChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: {
                    labelPosition: this.state.properties.fans.labelPosition,
                    start: new wjChart.DataPoint(this.state.properties.fans.start.x, input.value),
                    end: this.state.properties.fans.end
                },
                arcs: this.state.properties.arcs,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    fexChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: {
                    labelPosition: this.state.properties.fans.labelPosition,
                    start: this.state.properties.fans.start,
                    end: new wjChart.DataPoint(input.value, this.state.properties.fans.end.y)
                },
                arcs: this.state.properties.arcs,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    feyChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: {
                    labelPosition: this.state.properties.fans.labelPosition,
                    start: this.state.properties.fans.start,
                    end: new wjChart.DataPoint(this.state.properties.fans.end.x, input.value)
                },
                arcs: this.state.properties.arcs,
                timeZones: this.state.properties.timeZones
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    tlpChanged(menu) {
        if (menu.selectedValue != null) {
            this.setState({
                properties: {
                    retracements: this.state.properties.retracements,
                    fans: this.state.properties.fans,
                    arcs: this.state.properties.arcs,
                    timeZones: {
                        labelPosition: menu.selectedValue,
                        startX: this.state.properties.timeZones.startX,
                        endX: this.state.properties.timeZones.endX
                    }
                }
            });
        }
    }
    tsxChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: this.state.properties.fans,
                arcs: this.state.properties.arcs,
                timeZones: {
                    labelPosition: this.state.properties.timeZones.labelPosition,
                    startX: input.value,
                    endX: this.state.properties.timeZones.endX
                }
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
    texChanged(input) {
        this.setState({
            properties: {
                retracements: this.state.properties.retracements,
                fans: this.state.properties.fans,
                arcs: this.state.properties.arcs,
                timeZones: {
                    labelPosition: this.state.properties.timeZones.labelPosition,
                    startX: this.state.properties.timeZones.startX,
                    endX: input.value
                }
            }
        });
        if (this.theChart) {
            this.theChart.invalidate();
        }
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
