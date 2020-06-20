import React, { useContext, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import RecordService from "../../services/record.service"
import { UserContext } from '../../context/user-context';

import useStyles from './style'

export default function RecordsList(props) {
    const classes = useStyles();
    const [userRecords, setUserRecords] = useState([]);
    const { state: { user } } = useContext(UserContext)

    useEffect(() => {
        RecordService.totals(user.accessToken).then(data => {
            setUserRecords(data)
        })
    }, [])

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

    return (
        <div className={classes.main}>
            <div className={classes.outerTable}>
                <TableContainer classes={{ root: classes.root }} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Sentences</TableCell>
                                <TableCell>Recoded</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userRecords.map((record) => (
                                <TableRow key={record._id}>
                                    <TableCell>{record._id}</TableCell>
                                    <TableCell>
                                        {record.sentences}
                                    </TableCell>
                                    <TableCell>
                                        {recordedString(record.totalRecorded)}
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
