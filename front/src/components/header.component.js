import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: '#3f51b5'
  },
  selected: {
    color: '#fff',
  },
  label: {
    fontSize: '1.25rem !important'
  }
});

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState('/');

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        history.push(newValue)
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Sentences" value='/' />
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="My Records" value='/records' />
      <BottomNavigationAction classes={{ label: classes.label, selected: classes.selected }} label="Record Next" value='/record' />
    </BottomNavigation>
  );
}
