import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import Box from "@material-ui/core/Box";
import PauseIcon from '@material-ui/icons/Pause';
import TextField from "@material-ui/core/TextField";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from './style'

export default function AudioComponent({ skip, handleRecord, saveRecord, currentRecord }) {
    const classes = useStyles();
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(undefined);
    const [url, setUrl] = useState(currentRecord ? currentRecord.url || '' : '');
    const [play, setPlay] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            let audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/mpeg-3" });
                handleRecord(audioBlob)
                const audioUrl = URL.createObjectURL(audioBlob);
                setUrl(audioUrl)
                console.log(audioUrl)
                audioChunks = []
            });

            setRecorder(mediaRecorder)
        });
        return setRecorder(false)
    }, [])

    const togglePlay = () => {
        if (!play) {
            let newAudio = new Audio(url)
            newAudio.play();
            newAudio.addEventListener('ended', () => {
                setPlay(false)
            });
            setAudio(newAudio)
            setPlay(true)
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

    const save = () => {
        saveRecord()
        setUrl('')
        setAudio(null)
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 32) {
            toggleRecording()
        }
        if (e.keyCode === 77) {
            togglePlay()
        }
        if (e.keyCode === 83) {
            save()
        }
    }

    return (
        <Box>
            <TextField autoFocus onKeyDown={handleKeyPress} style={{ width: 0 }} />
            <Box className={classes.mic}>
                <IconButton color="primary" disabled={!url} onClick={togglePlay}>
                    {
                        play
                            ? <PauseIcon fontSize="large" />
                            : <PlayArrowIcon fontSize="large" />
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
                <IconButton color="primary" disabled={!url} onClick={save}>
                    <SaveIcon fontSize="large" />
                </IconButton>
            </Box>

            <Button variant="outlined" color="primary" onClick={skip}>
                Skip sentence
            </Button>

        </Box>
    );
}