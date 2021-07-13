import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        border: "1 solid black",
        borderRadius: "8px",
        // height: "100%",
        // width: "100%",
    },
}));

export default function MsgBox(props) {
    const classes = useStyles(props);


    return (
        <Grid container className={classes.root}>
            <Grid className={classes.header}>
                <Grid className={classes.name}>
                    <Typography color="secondary">{props.name}</Typography>
                </Grid>
                <Grid>
                    <Typography color="secondary">{props.time}</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>{props.message}</Typography>
            </Grid>
        </Grid>
    );
}