import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import qs from 'query-string';

import RecordService from "../../services/record.service"
import { UserContext } from '../../context/user-context';

import useStyles from './style'

export default function RecordsList(props) {
    const { page, limit } = qs.parse(props.location.search)
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState({ docs: [], limit: 25, total: 0, page: page || 1, pages: 0 });
    const [totalRecorded, setTotalRecorded] = useState(0);
    const [currentAudio, setCurrentAudio] = useState({
        play: false,
        url: '',
        audio: null
    })
    const { state: { user } } = useContext(UserContext)

    const handleClickOpen = ({ sentence }) => {
        history.push(`/record/${sentence._id}`, { sentence })
    };

    useEffect(() => {
        RecordService.list(user.accessToken, page, limit).then(data => {
            setData(data)
        })

        RecordService.total(user.accessToken).then(data => {
            if (data && data.totalRecorded) {
                setTotalRecorded(data.totalRecorded)
            }
        })
    }, [page, limit])

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
                currentAudio.audio.pause()
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

    const recordedString = (totalRecorded) => {
        let decimal = (totalRecorded % 1).toFixed(2).substring(2);
        let secNum = parseInt(totalRecorded, 10); // don't forget the second param
        let hours = Math.floor(secNum / 3600);
        let minutes = Math.floor((secNum - (hours * 3600)) / 60);
        let seconds = secNum - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return `${hours}:${minutes}:${seconds}.${decimal}`;
    }

    const handleChangePage = (event, newPage) => {
        props.history.push({
            pathname: props.location.pathname,
            search: qs.stringify({ page: newPage + 1, limit })
        })
    }
    const handleChangeRowsPerPage = (event) => {
        let newLimit = parseInt(event.target.value, 10);
        props.history.push({
            pathname: props.location.pathname,
            search: qs.stringify({ page: 1, limit: newLimit })
        })
    }

    return (
        <div className={classes.main}>
            <Typography variant="h4" gutterBottom>
                Total Recorded: {recordedString(totalRecorded)}
            </Typography>
            <div className={classes.outerTable}>
                <TableContainer classes={{ root: classes.root }} component={Paper}>
                    <TablePagination
                        component="div"
                        count={data.total}
                        page={data.page - 1}
                        onChangePage={handleChangePage}
                        rowsPerPage={data.limit}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Record</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.docs.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell component="th" scope="row">
                                        <IconButton color="primary" onClick={() => playRecord(record)}>
                                            {
                                                record.url === currentAudio.url && currentAudio.play
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
