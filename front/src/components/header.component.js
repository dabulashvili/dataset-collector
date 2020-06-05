import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: 'blue'
  },
  selected: {
      color: '#fff',
  },
  label: {
      fontSize: '1.25rem !important'
  }
});

export default function Header({history}) {
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
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="home" value='/'/>
      <BottomNavigationAction classes={{label: classes.label,selected: classes.selected}} label="voice" value='/voice'/>
      <BottomNavigationAction classes={{label: classes.label,selected: classes.selected}} label="edit voice" value='/edit-voice'/>
    </BottomNavigation>
  );
}
