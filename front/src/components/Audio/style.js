import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
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