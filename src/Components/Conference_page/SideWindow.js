import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        border: "1 solid black",
        borderRadius: "8px",
        height: "100%",
        width: "100%",
    },
}));

export default function SideWindow(props) {
    const classes = useStyles(props);
    return (
        <Grid className={classes.root}>

        </Grid>
    );
}