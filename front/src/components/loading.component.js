import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 69,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .75)',
        textAlign: 'center',
        zIndex: 1,
        [theme.breakpoints.down(547)]: {
            top: 72,
        },
        [theme.breakpoints.down(405)]: {
            top: 92,
        },

    },
}));
const LoadingComponent = () => {
    const classes = useStyles()
    return (
        <div className={classes.root} />
    );
};

export default LoadingComponent;