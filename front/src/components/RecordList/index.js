import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/Mic'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import qs from 'query-string'

import TablePaginationActions from '../TablePaginationActions'
import UserTotalRecords from '../UserTotalRecords'
import RecordService from '../../services/record.service'
import { UserContext } from '../../context/user-context'

import useStyles from './style'

export default function RecordsList(props) {
    const { page, limit } = qs.parse(props.location.search)
    const classes = useStyles()
    const history = useHistory()
    const [data, setData] = useState({ docs: [], limit: 25, total: 0, page: page || 1, pages: 0 })
    const [currentAudio, setCurrentAudio] = useState({
        play: false,
        url: '',
        audio: null,
    })
    const { state: { user } } = useContext(UserContext)

    const handleClickOpen = ({ sentence }) => {
        history.push(`/record/${sentence._id}`, { sentence })
    }

    useEffect(() => {
        document.title = 'My Records'
        RecordService.list(user.accessToken, page, limit).then(data => {
            setData(data)
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
                }))
            }

            let newAudio = new Audio(record.url)
            newAudio.play()
            newAudio.addEventListener('ended', () => setCurrentAudio({
                ...currentAudio,
                play: false,
            }))
            setCurrentAudio({
                url: record.url,
                audio: newAudio,
                play: true,
            })
        }
    }

    const handleChangePage = (event, newPage) => {
        props.history.push({
            pathname: props.location.pathname,
            search: qs.stringify({ page: newPage + 1, limit }),
        })
    }
    const handleChangeRowsPerPage = (event) => {
        let newLimit = parseInt(event.target.value, 10)
        props.history.push({
            pathname: props.location.pathname,
            search: qs.stringify({ page: 1, limit: newLimit }),
        })
    }

    return (
        <div className={classes.main}>
            <UserTotalRecords/>
            <div className={classes.outerTable}>
                <TableContainer classes={{ root: classes.root }} component={Paper}>
                    <TablePagination
                        component="div"
                        count={data.total}
                        page={data.page - 1}
                        onChangePage={handleChangePage}
                        rowsPerPage={data.limit}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Record</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.docs.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell>{record.sentence.order}</TableCell>
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
    )
}
