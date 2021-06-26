import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
// css
import './AddPortfolio.css';
class AddPortfolio extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { name: '' };
        this.handleSubmit = () => {
            this.handleClose();
            this.props.onSubmit(this.state.name);
            this.setState({ name: '' }); // reset state
        };
        this.handleClose = () => this.props.onClose();
    }
    render() {
        const { isOpen, usedNames } = this.props;
        const hasError = usedNames.includes(this.state.name); // Check that the name is available
        return (<Dialog open={isOpen} aria-labelledby="AddPortfolio" onClose={this.handleClose}>
                <DialogTitle id="AddPortfolio">New Portfolio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create and track your portfolio or watchlist and maintain transaction history information.
                    </DialogContentText>
                    <TextField autoFocus required fullWidth margin="dense" label="Enter portfolio name" error={hasError} onChange={event => this.setState({ name: event.target.value })}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleSubmit} color="primary" disabled={hasError}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>);
    }
}
AddPortfolio.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    usedNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default AddPortfolio;
