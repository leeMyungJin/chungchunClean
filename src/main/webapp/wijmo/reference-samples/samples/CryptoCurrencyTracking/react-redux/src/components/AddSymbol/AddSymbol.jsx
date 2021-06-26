import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Button, Input, InputLabel, MenuItem, FormControl, Select, Chip, Dialog, DialogActions, DialogContent, DialogTitle, } from '@material-ui/core';
// css
import './AddSymbol.css';
class AddSymbol extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { symbols: this.props.portfolio.symbols };
        this.handleClose = () => this.props.onClose();
        this.handleChange = event => this.setState({ symbols: event.target.value });
        this.handleSubmit = () => {
            const { portfolio } = this.props;
            this.handleClose();
            this.props.onSubmit({
                name: portfolio.name,
                data: Object.assign({}, portfolio, { symbols: this.state.symbols }),
            });
        };
        this.renderSymbolsSelector = () => {
            const { symbols } = this.state;
            const dict = this.props.symbols;
            return (<Select multiple value={this.state.symbols} classes={{ selectMenu: 'select-menu' }} input={<Input id="select-multiple-chip"/>} onChange={this.handleChange} renderValue={(selected) => (<div>
                        {selected.map(value => (<Chip className="chip" key={value} label={value} onDelete={() => this.setState({
                symbols: symbols.filter(symbol => symbol !== value),
            })}/>))}
                    </div>)}>
                {dict.map(element => (<MenuItem key={element.symbol} value={element.symbol}>
                        {element.symbol}
                    </MenuItem>))}
            </Select>);
        };
    }
    render() {
        return (<Dialog open={true} fullWidth aria-labelledby="AddPortfolio" className="add-symbol" onClose={this.handleClose}>
                <DialogTitle id="AddPortfolio">Add Symbol</DialogTitle>
                <DialogContent>
                    <FormControl className="form-control">
                        <InputLabel htmlFor="select-multiple-chip">Find a Quote</InputLabel>
                        {this.renderSymbolsSelector()}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>);
    }
}
AddSymbol.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    symbols: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        symbol: PropTypes.string,
        rank: PropTypes.string,
    })).isRequired,
    portfolio: PropTypes.shape({
        name: PropTypes.string,
        symbols: PropTypes.array,
    }).isRequired,
};
export default AddSymbol;
