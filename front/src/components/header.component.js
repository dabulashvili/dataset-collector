import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: 'green'
  },
  selected: {
      color: '#fff',
  },
  label: {
      fontSize: '1.25rem !important'
  }
});

export default function Header({props}) {
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
      <BottomNavigationAction classes={{label: classes.label, selected: classes.selected}} label="Sentences" value='/'/>
      <BottomNavigationAction classes={{label: classes.label,selected: classes.selected}} label="My Records" value='/voice'/>
      <BottomNavigationAction classes={{label: classes.label,selected: classes.selected}} label="Record Next" value='/edit-voice'/>
    </BottomNavigation>
  );
}
