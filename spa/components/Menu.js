import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TaskListContainer from '../containers/TaskListContainer';

const styles = () => ({
  root: {
    width: '100%',
  },
});

class Menu extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Todos" />
            <Tab label="Pendentes" />
            <Tab label="Feitos" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TaskListContainer status="all"></TaskListContainer>          
          <TaskListContainer status="pending"></TaskListContainer>
          <TaskListContainer status="complete"></TaskListContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Menu);
