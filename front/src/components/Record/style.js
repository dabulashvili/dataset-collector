import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
    root: {
        width: '100%',
        textAlign: 'center'
    },
    disabled: {
        pointerEvents: 'none'
    },
    title: {
        fontSize: 32,
        padding: 20,
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
        width: '96%',
        margin: '0 auto'
    }
});
