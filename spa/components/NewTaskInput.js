import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Create from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width:'100%'  
  },
  createIcon: {
    margin:'auto',
    cursor:'pointer'
  }
});

class NewTask extends React.Component {
  state = {
    newTaskLabel: ''
  }
  changeNewTaskLabel = (value) => {
    this.setState({newTaskLabel: value});
  }
  render() {
    const { classes } = this.props;
    return (
          <div className={classes.container}>
            <Grid container justify="center" spacing={24} className={classes.gridContainer}>
              <Grid item xs={11}>
                <TextField
                  label="Nova tarefa"
                  id="margin-none"
                  className={classes.textField}
                  helperText="O que precisa ser feito?"
                  onChange={e => this.changeNewTaskLabel(e.target.value)}
                />
              </Grid>
              <Grid item xs={1} className={classes.createIcon}>
                <Create color={this.state.newTaskLabel === '' ? 'disabled' : 'primary'} />
              </Grid>
            </Grid>
          </div>
    );
  }
};

export default withStyles(styles)(NewTask);
