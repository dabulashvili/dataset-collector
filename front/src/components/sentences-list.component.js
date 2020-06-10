import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';

import Paper from '@material-ui/core/Paper';

import SentenceService from "../services/sentence.service"
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

export default function SentenceList() {
    const classes = useStyles();
    const history = useHistory();
    const [sentences, setSentences] = useState([]);
    const { state } = useContext(UserContext)

    const handleClickOpen = (sentence) => {
        history.push(`/record/${sentence._id}`, { sentence })
    };

    useEffect(() => {
        SentenceService.list(state.user.accessToken).then(data => {
            setSentences(data)
        })
    }, [])

    return (
        <div className={classes.main}>
            <div className={classes.outerTable}>
                <TableContainer classes={{ root: classes.root }} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sentence</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sentences.map((sentence) => (
                                <TableRow key={sentence._id}>
                                    <TableCell component="th" scope="row">
                                        {sentence.text}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => {
                                            handleClickOpen(sentence)
                                        }}>
                                            <MicIcon />
                                        </Button>
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
