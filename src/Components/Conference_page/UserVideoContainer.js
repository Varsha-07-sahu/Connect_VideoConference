import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "black",
        border: "1 solid black",
        borderRadius: "8px",
        height: "100%",
        width: "100%",
    },
    video: {
        height: "90%",
        width: "100%",
    },
    name: {
        height: "10%",
        width: "100%",
    }
}));

export default function UserVideoContainer(props) {
    const classes = useStyles(props);
    return (
        <Grid className={classes.root}>
            <Grid className={classes.video}>
                <video muted ref={props.video} height="100%" width="100%" autoPlay className={classes.video} />
            </Grid>
            <Grid className={classes.name}>
                <Typography>
                    {props.name}
                </Typography>
            </Grid>
        </Grid>
    );
}