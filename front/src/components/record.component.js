import React, { useEffect, useContext, useState } from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Audio from "./audio.component";
import sentenceService from '../services/sentence.service';
import { UserContext } from '../context/user-context';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import recordService from '../services/record.service';

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

const RecordComponent = ({ location, history, match }) => {
    const classes = useStyles();
    const currentId = match.params.id;
    const route = (id, sentence) => history.push(`/record/${id}`, { sentence })

    const { state } = useContext(UserContext);
    const [sentence, setSentence] = useState(location.state && location.state.sentence || {});
    const [allDone, setAllDone] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    const next = () => {
        // const id = myId === (rows.length - 1) ? rows.length - 1 : myId + 1
        // route(id)
    }
    const prev = () => {
        // const id = myId === 0 ? 0 : myId - 1
        // route(id)
    }

    const save = () => {
        recordService.save(state.user.accessToken, sentence, currentRecord)
            .then(data => {
                console.log(data)
                // move to next
            })
    }

    const handleRecord = (recordBlob) => {
        setCurrentRecord(recordBlob)
    }

    useEffect(() => {
        if (!currentId) {
            sentenceService.next(state.user.accessToken).then(data => {
                if (data) {
                    route(data._id, data)
                } else {
                    setAllDone(true)
                }
            })
        } else if (!sentence._id) {
            sentenceService.getById(state.user.accessToken, currentId).then(data => {
                setSentence(data)
            })
        }
    }, [currentId, sentence, allDone])

    return (
        <div>
            {
                allDone
                    ? <div>
                        <span className={classes.title} >
                            All Done!
                        </span>
                    </div>
                    : <div>
                        <Box className={classes.root}>
                            <span className={classes.title}>
                                {sentence.text}
                            </span>
                            <Box className={classes.content}>
                                <Box className={classes.mic}>
                                    <Audio next={next} prev={prev} handleRecord={handleRecord} />
                                </Box>
                            </Box>
                        </Box>
                        <Button disabled={!currentRecord} onClick={save}>
                            <SaveIcon />
                        </Button>
                    </div>
            }
        </div>
    );
};

export default RecordComponent;