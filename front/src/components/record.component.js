import React, {useEffect, useContext, useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Audio from "./audio.component";
import sentenceService from '../services/sentence.service';
import {UserContext} from '../context/user-context';
import recordService from '../services/record.service';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useSnackbar} from 'notistack';
import LoadingComponent from "./loading.component";

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    disabled: {
        pointerEvents: 'none'
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

const RecordComponent = ({location, history, match}) => {
    const classes = useStyles();
    const currentId = match.params.id;
    const route = (id, sentence) => history.push(`/record/${id}`, {sentence})

    const {enqueueSnackbar} = useSnackbar();
    const {state: {user}} = useContext(UserContext);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [sentence, setSentence] = useState(location.state ? location.state.sentence : {});
    const [allDone, setAllDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState(null);

    const next = () => {
        sentenceService.next(user.accessToken).then(data => {
            if (data) {
                setSentence(data)
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
        setLoading(true)
        recordService
            .save(user.accessToken, sentence, currentRecord)
            .then(data => {
                enqueueSnackbar('Record saved successfully!', {variant: 'success'});
                next();
            })
            .catch(error => {
                enqueueSnackbar('Error saving record!', {variant: 'error'});
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleRecord = (recordBlob) => {
        setCurrentRecord(recordBlob);
    }

    useEffect(() => {
        if (!currentId) {

            next()
        } else {
            Promise.all([
                recordService.getById(user.accessToken, currentId).then(data => {
                    setRecord(data);
                    return
                }),
                sentenceService.getById(user.accessToken, currentId).then(data => {
                    setSentence(data);
                    return
                })
            ]).then(() => {
                setLoading(false)
            })
        }
    }, [currentId])

    return (
        <div>
            {
                allDone
                    ? <div>
                        <span className={classes.title}>
                            All Done!
                        </span>
                    </div>
                    : <div>
                        {
                            loading &&
                            (
                                <>
                                    <LinearProgress/>
                                    <LoadingComponent/>
                                </>
                            )
                        }
                        <Container maxWidth="sm">
                            <Box className={`${classes.root} ${loading && classes.disabled}`}>
                                <span className={classes.title}>
                                    {sentence.text}
                                </span>
                                <Box className={classes.content}>
                                    <Box className={classes.mic}>
                                        <Audio next={next} prev={prev} handleRecord={handleRecord} saveRecord={save}
                                               currentRecord={record}/>
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