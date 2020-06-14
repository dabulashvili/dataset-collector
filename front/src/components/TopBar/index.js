import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { UserContext } from '../../context/user-context';
import useStyles from './style';

export default function TopBar({ children }) {

    const classes = useStyles();

    const { state, dispatch } = useContext(UserContext);

    return (
        <div>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        Hello, {state.user.name || 'let\'s do it'}!
                    </Typography>
                    <nav>
                        <NavLink variant="button" color="textPrimary" to="/sentences" activeClassName={classes.activeLink} className={classes.link}>
                            Sentences
                        </NavLink>
                        <NavLink variant="button" color="textPrimary" to="/records" activeClassName={classes.activeLink} className={classes.link}>
                            My Records
                        </NavLink>
                        <NavLink variant="button" color="textPrimary" to="/record" activeClassName={classes.activeLink} className={classes.link}>
                            Record new
                        </NavLink>
                    </nav>

                    <Tooltip title="Log Out">
                        <Button onClick={() => dispatch({ type: 'logout' })} color="inherit">
                            <ExitToAppIcon />
                        </Button>
                    </Tooltip>
                </Toolbar>
            </AppBar >
            {children}
        </div>
    );
}