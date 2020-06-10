import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PauseIcon from '@material-ui/icons/Pause';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TextField from "@material-ui/core/TextField";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    title: {
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        margin: '3rem auto'
    }
});
const AudioComponent = ({ next, prev, handleRecord, saveRecord, currentRecord }) => {
    const classes = useStyles();
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(undefined);
    const [url, setUrl] = useState(currentRecord ? currentRecord.url || '' : '');
    const [play, setPlay] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/mpeg-3" });
                handleRecord(audioBlob)
                const audioUrl = URL.createObjectURL(audioBlob);
                setUrl(audioUrl)
            });

            setRecorder(mediaRecorder)
        });
        return setRecorder(false)
    }, [])

    const togglePlay = () => {
        if (!play) {
            if (!audio) {
                let newAudio = new Audio(url)
                newAudio.play();
                newAudio.addEventListener('ended', () => {
                    setPlay(false)
                });
                setAudio(newAudio)
                setPlay(true)
            } else {
                audio.play()
                setPlay(true)
            }
        } else {
            audio.pause()
            setPlay(false)
        }
    }

    const toggleRecording = () => {
        if (recording) {
            recorder.stop()
        } else {
            recorder.start()
        }
        setRecording(!recording)
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 37) {
            prev()
        }
        if (e.keyCode === 39) {
            next()
        }
        if (e.keyCode === 32) {
            toggleRecording()
        }
        if (e.keyCode === 77) {
            togglePlay()
        }
        if (e.keyCode === 83) {
            saveRecord()
        }
    }

    return (
        <Box>
            <TextField autoFocus onKeyDown={handleKeyPress} style={{ width: 0 }} />
            <Box className={classes.mic}>
                <IconButton className={classes.buttonForArrows} aria-label="add an alarm" size='medium'>
                    <ArrowBackIosIcon fontSize="large" />
                </IconButton>
                <IconButton color="primary" disabled={!url} onClick={togglePlay}>
                    {
                        play
                            ? <PauseIcon />
                            : <PlayArrowIcon />
                    }
                </IconButton>
                <IconButton
                    onClick={toggleRecording}
                    className={classes.button}
                    aria-label="add an alarm">
                    {
                        recording
                            ? <PauseIcon fontSize="large" />
                            : <MicIcon fontSize="large" />
                    }
                </IconButton>
                <IconButton color="primary" disabled={!url} onClick={saveRecord}>
                    <SaveIcon />
                </IconButton>
                <IconButton className={classes.buttonForArrows} aria-label="add an alarm" size='medium'>
                    <ArrowForwardIosIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
}

export default AudioComponent