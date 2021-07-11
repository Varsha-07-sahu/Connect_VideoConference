import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";
import { borders } from '@material-ui/system';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { Avatar } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("./BackgroungImage.png")',
        height: '100vh',
    },
    videoBox: {
        backgroundColor: "#262626",
        height: "50%",
        width: "40%",
        border: "1",
        borderRadius: "8px",
        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
            width: "80%",
            height: "80%",
        },
    },
    video: {
        objectFit: "cover",
    },
    button: {
        border: "1",
        borderRadius: "50%"
    },
    header: {
        height: "20%",
        border: "1",
    },
    logo: {
        backgroundImage: 'url("./BackgroungImage.png")',
        height: "100%",
        zIndex: "10",
    },
    avatar: {
        margin: theme.spacing(10),
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
    }
}));

export default function JoiningPage(props) {
    const classes = useStyles(props);
    const { config, setConfig, name, myVideo, callId, callUser } = useContext(SocketContext);
    // setAudio(true);
    useEffect(() => {
        console.log("after setting ref");
        setConfig({ audio: true, video: true });
    }, [])
    console.log("call id is ", callId)
    return (
        <Grid
            container
            component="main"
            direction="row"
            className={classes.root}
        >
            <Grid className={classes.header}>
                <Grid className={classes.logo} />
            </Grid>
            <Grid
                container
                component="main"
                direction="column"
                alignItems="center"
                justify="center">
                <Grid
                    className={classes.videoBox}
                    alignItems="center"
                >
                    {/* <Typography variant="h5" gutterBottom >{name || "Name"}</Typography> */}
                    {/* <Grid>
                        <Avatar alt={name || "a"} className="avatar">

                        </Avatar>
                    </Grid> */}


                    <video height="100%" width="100%" muted ref={myVideo} autoPlay className={classes.video} />

                </Grid>
                <Grid
                >
                    {config.audio === true ? (
                        <IconButton onChange={() => setConfig({ audio: false })} color="secondary" className={classes.button} aria-label="Turn Mic off">
                            <MicIcon />
                        </IconButton>
                    ) : (
                        <IconButton onChange={() => setConfig({ audio: true })} color="primary" className={classes.button} aria-label="Turn Mic on">
                            <MicOffIcon />
                        </IconButton>
                    )}


                    <IconButton color="primary" className={classes.button} aria-label="Turn Video off">
                        <VideocamIcon />
                    </IconButton>
                    <Link to="/connect">
                        <Button variant="contained" onClick={() => {
                            console.log("attempt to call", callId)
                            if (callId)
                                callUser(callId);
                        }} color="primary">
                            Join
                        </Button>
                    </Link>

                </Grid>
            </Grid>

        </Grid >
    );
}