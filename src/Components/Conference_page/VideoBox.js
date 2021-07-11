import { Grid, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ReceiverVideo from './ReceiverVideo';
import SenderVideo from './SenderVideo';
import { makeStyles } from '@material-ui/core';
import { whileStatement } from '@babel/types';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { Typography } from '@material-ui/core';
import { borders } from '@material-ui/system';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import Notification_toAcceptCall from '../Permission/Notification_toAcceptCall';

import DialogBox from '../Start_page/DialogBox';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#282c34",
        height: '100vh',
    },
    Video_Container: {
        height: "90%",
        // width: "100%",
    },
    Option_container: {
        height: "10%",
        width: "100%",
        backgroundColor: "white",
    },
    SenderVideo_container: {
        width: "80%",
        height: "90%",
        border: "1",
        borderRadius: "5%",
        color: "white",
        marginLeft: "8%",
        // backgroundColor: "red",
    },
    MyVideo_container: {

        color: "white",
        // backgroundColor: "black",

        border: "1",
        borderRadius: "2%",


        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
            width: "80%",
            height: "80%",
        },
    },
    fullScreen: {
        marginLeft: "10%",
        height: "90%",
        width: "80%",
    },
    halfScreen: {
        position: "absolute",
        bottom: "14%",
        right: "4%",
        height: "25%",
        width: "20%",
    },

    MyVideo: {
        backgroundColor: "black",
        height: "100%",
        // width: "95%",
        marginLeft: "10px",
        color: "white",
    },
    SenderVideo: {
        backgroundColor: "black",
        height: "100%",
        // width: "95%",
        marginLeft: "15px",
        // backgroundColor: "#262626",
        // height: "50%",
        // width: "40%",
        border: "1",
        borderRadius: "5%",
        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
            width: "80%",
            height: "80%",
        },
    },
    video: {
        objectFit: "cover",
    }

}));

function VideoBox(props) {
    const classes = useStyles(props);
    const { name, callAccepted, setConfig, myVideo, userVideo, callEnded, stream, call, me, leaveCall, callUser, setName } = useContext(SocketContext);
    useEffect(() => {
        console.log("after setting ref");
        setConfig({ audio: true, video: true });
    }, [])
    const handleCallEnd = () => {
        // console.log("history ", props.history);
        props.history.push("/")
        leaveCall()
    }
    return (
        <Grid
            container
            component="main"
            className={classes.root}
            direction="column">
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"

                className={classes.Video_Container}
            >
                {
                    callAccepted && !callEnded && (
                        <Grid className={classes.SenderVideo_container}>

                            <video playsInline height="100%" width="100%" ref={userVideo} autoPlay className={classes.video}></video>

                            <Grid>
                                <Typography variant="h5" gutterBottom>{call ? call.name : 'UserName'}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    stream && (
                        <Grid
                            className={classes.MyVideo_container + " " + (!callAccepted || callEnded ? classes.fullScreen : classes.halfScreen)}>

                            <video muted ref={myVideo} height="100%" width="100%" autoPlay className={classes.video}></video>

                            <Grid>
                                <Typography color="white" variant="h5" gutterBottom>{"You"}</Typography>
                            </Grid>
                        </Grid>
                    )}

            </Grid>
            <Grid
                container
                direction="row"
                className={classes.Option_container}
                justify="center"
                alignItems="center"
            >
                <Grid

                    className={classes.OptionsBox}>
                    <IconButton color="secondary" className={classes.button} aria-label="Turn Mic off">
                        <MicIcon fontSize="large" />
                    </IconButton>

                    <IconButton color="primary" className={classes.button} aria-label="Turn Video off">
                        <VideocamIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="secondary" className={classes.button} aria-label="End Call" onClick={handleCallEnd}>
                        <CallEndIcon fontSize="large" />
                    </IconButton>

                    <DialogBox />

                    {call != null && call.isReceivedCall && !callAccepted && (
                        <Notification_toAcceptCall />
                    )}

                </Grid>

            </Grid>

        </Grid>
    );
}

export default withRouter(VideoBox);

