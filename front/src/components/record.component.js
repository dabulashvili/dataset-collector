import React, { useEffect, useContext, useState } from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Audio from "./audio.component";
import sentenceService from '../services/sentence.service';
import { UserContext } from '../context/user-context';
import recordService from '../services/record.service';
import Container from '@material-ui/core/Container';

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
    const [saving, setSaving] = useState(true)
    const [loading, setLoading] = useState(true)
    const [uploaded, setUploaded] = useState(null)

    const next = () => {
        sentenceService.next(state.user.accessToken).then(data => {
            if (data) {
                route(data._id, data)
            } else {
                setAllDone(true)
            }
            setLoading(false)
        })
    }
    const prev = () => {
        // const id = myId === 0 ? 0 : myId - 1
        // route(id)
    }

    const save = () => {
        recordService.save(state.user.accessToken, sentence, currentRecord)
            .then(data => {
                next()
            }).catch(error => {
                console.error(error)
            })
    }

    const handleRecord = (recordBlob) => {
        setCurrentRecord(recordBlob)
    }

    useEffect(() => {
        if (!currentId) {

            next()
        } else {

            recordService.getById(state.user.accessToken, currentId).then(data => {
                setUploaded(data)
            })

            sentenceService.getById(state.user.accessToken, currentId).then(data => {
                setSentence(data)
                setLoading(false)
            })
        }
    }, [])

    return (
        <div>
            {
                loading ? <div />
                    : allDone
                        ? <div>
                            <span className={classes.title} >
                                All Done!
                        </span>
                        </div>
                        : <div>
                            <Container maxWidth="sm">
                                <Box className={classes.root}>
                                    <span className={classes.title}>
                                        {sentence.text}
                                    </span>
                                    <Box className={classes.content}>
                                        <Box className={classes.mic}>
                                            <Audio next={next} prev={prev} handleRecord={handleRecord} saveRecord={save} currentRecord={uploaded} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Container>
                        </div>
            }
        </div>
    );
};

export default RecordComponent;