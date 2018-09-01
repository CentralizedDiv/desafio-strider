import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {connect} from 'react-redux';

import NewTaskInput from '../components/NewTaskInput';
import Menu from '../components/Menu';

//Tema preto
const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' }
  },
});

const styles = () => ({
  gridContainer: {
    width:'100%',
    padding:'30px'
  }
});

class App extends Component {
  render () {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container justify="center" spacing={24} className={classes.gridContainer}>
          <Grid item xs={8}>
            <NewTaskInput/>
          </Grid>
          <Grid item xs={8}>
            <Menu/>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}
export default connect(state => state)(withStyles(styles)(App));