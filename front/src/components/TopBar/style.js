import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        fontWeight: '20px',
        textDecoration: 'none',
        color: 'white',
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    activeLink: {
        textDecoration: 'underline',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))