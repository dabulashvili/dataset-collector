import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Audio from "./audio.component";

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    title: {
        fontSize: 32,
        padding: 20,
        color: '#000',
        display: "block"
    },
    content: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button: {
        padding: 20,
        backgroundColor: 'red'
    },
    buttonForArrows: {
        padding: 20,
        backgroundColor: "transparent"
    },
    mic: {
        width: '96%',
        margin: '0 auto'
    }
});

const SingleRecordComponent = ({match, history, rows}) => {
    const classes = useStyles();
    const myId = parseInt(match.params.id);
    const route = id => history.push(`/single-record/${id}`)

    const next = () => {
        const id = myId === (rows.length - 1) ? rows.length - 1 : myId + 1
        route(id)
    }
    const prev = () => {
        const id = myId === 0 ? 0 : myId - 1
        route(id)
    }
    return (
        <Box className={classes.root}>
            <span className={classes.title}>
                {rows[myId].name}
            </span>
            <Box className={classes.content}>
                <Box className={classes.mic}>
                    <Audio next={next} prev={prev}/>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleRecordComponent;