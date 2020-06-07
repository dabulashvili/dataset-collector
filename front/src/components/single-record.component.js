import React, { useEffect, useContext } from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Audio from "./audio.component";
import sentenceService from '../services/sentence.service';
import { UserContext } from '../context/user-context';

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

const SingleRecordComponent = ({ location, history, match }) => {
    let sentence  = location.state && location.state.sentence || {} 
    console.log(sentence)
    const classes = useStyles();
    console.log(match.params)
    const currentId = match.params.id;
    const route = id => history.push(`/single-record/${id}`)

    const { state } = useContext(UserContext);

    const next = () => {
        // const id = myId === (rows.length - 1) ? rows.length - 1 : myId + 1
        // route(id)
    }
    const prev = () => {
        // const id = myId === 0 ? 0 : myId - 1
        // route(id)
    }

    useEffect(() => {
        if (!sentence._id) {
            console.log(currentId)
            sentenceService.getById(state.user.accessToken, currentId).then(data => {
                console.log(data)
                sentence = data
            })
        }
    })

    return (
        <Box className={classes.root}>
            <span className={classes.title}>
                {sentence.text}
            </span>
            <Box className={classes.content}>
                <Box className={classes.mic}>
                    <Audio next={next} prev={prev} />
                </Box>
            </Box>
        </Box>
    );
};

export default SingleRecordComponent;