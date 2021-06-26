import * as React from 'react';
import * as PropTypes from 'prop-types';
// material-ui
import { Button, TextField, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogTitle, List, ListSubheader, ListItem, ListItemSecondaryAction, ListItemText, } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
// css
import './EditPortfolio.css';
class EditPortfolio extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { filter: null };
        this.handleDelete = (name) => this.props.onDelete(name);
        this.handleSelect = (name) => this.props.onSelect(name);
        this.handleClose = () => {
            this.props.onClose();
            this.setState({ filter: null }); // reset state
        };
        this.handleSubmit = () => {
            this.handleSelect();
            this.handleClose();
        };
        this.renderPortoliosList = () => {
            const { selectedPortfolio, portfoliosList } = this.props;
            const { filter } = this.state;
            const filteredList = filter
                ? portfoliosList.filter(portfolio => portfolio.name.toLowerCase().includes(filter))
                : portfoliosList;
            return filteredList.length ? (<React.Fragment>
                {filteredList.map(portfolio => (<ListItem button key={portfolio.name} onClick={() => this.handleSelect(portfolio.name)} className={`list-item ${portfolio.name === selectedPortfolio ? 'list-item--active' : ''}`}>
                        <ListItemText primary={portfolio.name}/>
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete" disabled={portfoliosList.length === 1} onClick={() => this.handleDelete(portfolio.name)}>
                                <DeleteForever />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}
            </React.Fragment>) : (<Typography>No entries found containing: {filter}</Typography>);
        };
    }
    render() {
        const { isOpen } = this.props;
        return (<Dialog fullWidth className="edit-portfolio" aria-labelledby="EditPortfolio" open={isOpen} onClose={this.handleClose}>
                <DialogTitle id="EditPortfolio">Portfolios</DialogTitle>
                <DialogContent>
                    <TextField required fullWidth margin="dense" placeholder="Search portfolio" onChange={event => this.setState({ filter: event.target.value.toLowerCase() })}/>
                    <List className="list" subheader={<ListSubheader>Name</ListSubheader>}>
                        {this.renderPortoliosList()}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>);
    }
}
EditPortfolio.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedPortfolio: PropTypes.string.isRequired,
    portfoliosList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default EditPortfolio;
