import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import Box from "@material-ui/core/Box";
import PauseIcon from '@material-ui/icons/Pause';
import TextField from "@material-ui/core/TextField";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Recorder from 'recorder-js';

import useStyles from './style'

export default function AudioComponent({ prev, skip, handleRecord, saveRecord, currentUrl }) {
    const classes = useStyles();
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(undefined);
    const [url, setUrl] = useState('');
    const [play, setPlay] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const recorder = new Recorder(audioContext, {
            // An array of 255 Numbers
            // You can use this to visualize the audio stream
            // If you use react, check out react-wave-stream
            // onAnalysed: data => console.log(data)
        });


        let stream;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(s => {
                recorder.init(s)
                stream = s
            })
            .catch(err => console.log('Uh oh... unable to get stream...', err));

        setRecorder(recorder)
        setRecording(false)
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        }
    }, [])

    const togglePlay = () => {
        if (!play) {
            let newAudio = new Audio(url || currentUrl)
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
            recorder.stop().then(({ blob, buffer }) => {
                handleRecord(blob)
                setUrl(URL.createObjectURL(blob))
            })
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
                <Tooltip title={play ? "Pause" : "Play"}>
                    <IconButton color="primary" disabled={!url && !currentUrl} onClick={togglePlay}>
                        {
                            play
                                ? <PauseIcon fontSize="large" />
                                : <PlayArrowIcon fontSize="large" />
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title={recording ? "Stop" : "Record"}>
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
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton color="primary" disabled={!url} onClick={save}>
                        <SaveIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Tooltip title="Previous">
                <IconButton variant="outlined" color="primary" onClick={prev}>
                    <SkipPreviousIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Skip">
                <IconButton variant="outlined" color="primary" onClick={skip}>
                    <SkipNextIcon />
                </IconButton>
            </Tooltip>

        </Box>
    );
}