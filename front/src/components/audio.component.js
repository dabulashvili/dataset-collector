import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import PauseIcon from '@material-ui/icons/Pause';
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TextField from "@material-ui/core/TextField";

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
const Audio = ({next, prev}) => {
    const classes = useStyles();
    const [recording, setRecording] = useState(false)
    const [recorder, setRecorder] = useState(undefined)
    const [url, setUrl] = useState('')

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                setUrl(audioUrl)
            });

            setRecorder(mediaRecorder)
        });
        return setRecorder(false)
    }, [])

    const startRecording = () => {
        recorder.start()
        setRecording(true)
    }

    const stopRecording = () => {
        recorder.stop()
        setRecording(false)
    }

    const handleClick = () => {
        if (recording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 37) {
            prev()
        }
        if (e.keyCode === 39) {
            next()
        }
        if (e.keyCode === 32) {
            if (recording) {
                stopRecording()
            } else {
                startRecording()
            }
        }
    }

    return (
        <Box>
            <TextField autoFocus onKeyDown={handleKeyPress} style={{width: 0}}/>
            <Box className={classes.mic}>
                <IconButton className={classes.buttonForArrows} aria-label="add an alarm" size='medium'>
                    <ArrowBackIosIcon fontSize="large"/>
                </IconButton>
                <IconButton
                    onClick={handleClick}
                    className={classes.button}
                    aria-label="add an alarm"
                    size='medium'>
                    {
                        recording
                            ? <PauseIcon fontSize="large"/>
                            : <MicIcon fontSize="large"/>
                    }
                </IconButton>
                <IconButton className={classes.buttonForArrows} aria-label="add an alarm" size='medium'>
                    <ArrowForwardIosIcon fontSize="large"/>
                </IconButton>
            </Box>
            <audio src={url} controls="controls"/>
        </Box>
    );
}

export default Audio
//dato poops გამუდმებით და სულ poops
//ახლა დავწერ კოდს და გავტეხავ მერე კოდს
//კოდი: ღილაკი ერთი- როცა დავაჭერ ხმა ჩაიწეროს
//კოდი: ღილაკი მეორე- როცა დავაჭერ ტექსტად გადააქციოს
//კოდი: ღილაკი მესამე- ჩაწერილი ხმა როცა გეტყვი გადააქციე ტექსტად
//კოდი: ყოველთვის სწორად გააკეთე და არაფერი ბაგი არ გაუშვა იცოდე
