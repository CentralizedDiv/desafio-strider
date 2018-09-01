import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import styles from '../styles/task.js';

class Task extends React.Component {
    render() {
        const { classes, task } = this.props;
        return (
            <ExpansionPanel className={classes.task} expanded={task.status !== 'complete' ? false : undefined}>
                <ExpansionPanelSummary className={task.status == 'complete' ? classes.complete : ''} expandIcon={task.status === 'complete' ? <ExpandMoreIcon /> : ''}>
                    <Delete className={classes.deleteIcon} fontSize='inherit'/>
                    <Typography>{task.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <img className={classes.imageComplete} src={task.url}></img>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(Task);
