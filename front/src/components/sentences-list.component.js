import React from 'react';
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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        width: '60%',
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

const rows = [
    {
        name: 'zoro',
    },
    {
        name: 'zoro0',
    },
    {
        name: 'zoro1',
    },
    {
        name: 'zoro2',
    },
    {
        name: 'zoro3',
    },
];

export default function SentenceList() {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <span className={classes.title}>Sentences</span>
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
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button>
                                            <MicIcon></MicIcon>
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
