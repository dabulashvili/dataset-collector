import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        width: '80%',
        marginTop: 60,
    },
    outerTable: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    main: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        lineHeight: 1,
    },
    skipedRow: {
        backgroundColor: '#e3f2fd',
    },
    recordedRow: {
        backgroundColor: '#e8f5e9',
    },
})
