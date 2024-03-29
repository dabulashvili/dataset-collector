import React, { useContext, useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/Mic'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import qs from 'query-string'

import TablePaginationActions from '../TablePaginationActions'
import SentenceService from '../../services/sentence.service'
import { UserContext } from '../../context/user-context'
import useStyles from './style'

export default function SentenceList(props) {
    const { page, limit } = qs.parse(props.location.search)
    const classes = useStyles()
    const history = useHistory()
    const { state } = useContext(UserContext)
    const [data, setData] = useState({ docs: [], limit: 25, total: 0, page: page || 1, pages: 0 })

    const handleClickOpen = (sentence) => {
        history.push(`/record/${sentence._id}`, { sentence })
    }

    useEffect(() => {
        document.title = 'Sentences'
        SentenceService.list(state.user.accessToken, page, limit).then(data => {
            setData(data)
        })
    }, [page, limit])

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
        <Fragment>
            <div className={classes.main}>
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
                                    <TableCell>Sentence</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.docs.map((sentence) => (
                                    <TableRow className={sentence.recorded && classes.recordedRow || sentence.skip && classes.skipedRow} key={sentence._id}>
                                        <TableCell>{sentence.order}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {sentence.text} {sentence.skip && ' (skipped)'}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => {
                                                handleClickOpen(sentence)
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
        </Fragment >
    )
}
