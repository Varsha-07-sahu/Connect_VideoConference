import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { useEffect, useRef } from "react";

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
    const { stream, me, room } = useContext(SocketContext);

    useEffect(() => {
        /// search corresponding stream for user id
        if (props.userId === me) {
            mainVideRef.current.srcObject = stream;
            return;
        }
        let user = room.find(r => r.id === props.userId);
        if (user) mainVideRef.current.srcObject = user.stream;
    }, [props.userId])
    const mainVideRef = useRef();
    return (
        <Grid className={classes.root}>
            <Grid className={classes.video}>
                <video muted ref={mainVideRef} height="100%" width="100%" autoPlay className={classes.video} />
            </Grid>
            <Grid className={classes.name}>
                <Typography>
                    {props.name}
                </Typography>
            </Grid>
        </Grid>
    );
}