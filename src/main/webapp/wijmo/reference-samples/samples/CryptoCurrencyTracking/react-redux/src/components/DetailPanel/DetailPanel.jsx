import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Table, TableBody, TableCell, TableRow, Typography, } from '@material-ui/core';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon, } from '@material-ui/icons';
// components
import { default as Chart } from '../Chart/Chart';
import { default as Column } from '../Column/Column';
import { default as Row } from '../Row/Row';
// css
import './DetailPanel.css';
class DetailPanel extends React.Component {
    constructor() {
        super(...arguments);
        this.renderSummaryRows = data => {
            const { time, volume, open, close, history, performanceYear } = data;
            const priceHistory = data.history.map(el => el.close);
            const rangeMin = Math.min(...priceHistory).toFixed(2);
            const rangeMax = Math.max(...priceHistory).toFixed(2);
            const summary = [
                { name: 'Time', value: time.toTimeString() },
                { name: 'Volume', value: volume.toFixed(2) },
                { name: 'Open', value: open.toFixed(2) },
                { name: 'Close', value: close.toFixed(2) },
                { name: 'Prev. Open', value: history[0].open.toFixed(2) },
                { name: 'Prev. Close', value: history[0].close.toFixed(2) },
                { name: '1-Year Change', value: `${performanceYear.toFixed(2)}%` },
                { name: 'Range', value: `${rangeMin} - ${rangeMax}` },
            ];
            return (<React.Fragment>
                {summary.map(entry => (<TableRow key={entry.name}>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell align="right">{entry.value}</TableCell>
                    </TableRow>))}
            </React.Fragment>);
        };
    }
    render() {
        const { dataItem } = this.props;
        const isRising = dataItem.close > dataItem.open;
        const difference = (dataItem.close - dataItem.open).toFixed(2);
        return (<div className="detail-panel">
                <Row>
                    <Column className="column" flexDirection="column" shrink>
                        <Typography className={`headline ${isRising ? 'headline_increased' : ''}`} variant="h5">
                            {isRising ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            {dataItem.close.toFixed(2)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {isRising ? '+' : '-'}
                            {difference}
                        </Typography>
                    </Column>
                    <Column className="column">
                        <Chart dataItem={dataItem}/>
                    </Column>
                    <Column className="column" shrink>
                        <Table>
                            <TableBody>{this.renderSummaryRows(dataItem)}</TableBody>
                        </Table>
                    </Column>
                </Row>
            </div>);
    }
}
DetailPanel.propTypes = {
    dataItem: PropTypes.shape({
        close: PropTypes.number,
        history: PropTypes.array,
        open: PropTypes.number,
        performanceYear: PropTypes.number,
        time: PropTypes.any,
        volume: PropTypes.number,
    }).isRequired,
};
export default DetailPanel;
