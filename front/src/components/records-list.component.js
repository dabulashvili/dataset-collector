import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import Paper from '@material-ui/core/Paper';

import RecordService from "../services/record.service"
import { UserContext } from '../context/user-context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        width: '80%',
        marginTop: 60
    },
    outerTable: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    main: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        lineHeight: 1
    }
});

export default function RecordsList() {
    const classes = useStyles();
    const history = useHistory();
    const [records, setRecords] = useState([]);
    const [currentAudio, setCurrentAudio] = useState({
        play: false,
        url: '',
        audio: null
    })
    const { state } = useContext(UserContext)

    const handleClickOpen = ({ sentence }) => {
        history.push(`/record/${sentence._id}`, { sentence })
    };

    useEffect(() => {
        RecordService.list(state.user.accessToken).then(data => {
            setRecords(data)
        })
    }, [])

    const playRecord = (record) => {
        if (record.url === currentAudio.url) {
            if (currentAudio.play) {
                currentAudio.audio.pause()
                setCurrentAudio({
                    ...currentAudio,
                    play: false,
                })
            } else {
                currentAudio.audio.play()
                setCurrentAudio({
                    ...currentAudio,
                    play: true,
                })
            }
        } else {
            if (currentAudio.audio) {
                currentAudio.audio.removeEventListener('ended', () => setCurrentAudio({
                    ...currentAudio,
                    play: false,
                }));
            }

            let newAudio = new Audio(record.url);
            newAudio.play();
            newAudio.addEventListener('ended', () => setCurrentAudio({
                ...currentAudio,
                play: false
            }));
            setCurrentAudio({
                url: record.url,
                audio: newAudio,
                play: true,
            })
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.outerTable}>
                <TableContainer classes={{ root: classes.root }} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Record</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell component="th" scope="row">
                                        <IconButton color="primary" onClick={() => playRecord(record)}>
                                            {
                                                currentAudio.play
                                                    ? <PauseIcon />
                                                    : <PlayArrowIcon />
                                            }
                                        </IconButton>
                                        {record.sentence.text}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => {
                                            handleClickOpen(record)
                                        }}>
                                            <MicIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
