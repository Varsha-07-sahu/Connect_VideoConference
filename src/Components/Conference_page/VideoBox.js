import { Grid, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';
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
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        width: "75%",
        height: "90%",
        border: "1",
        borderRadius: "8px",
        color: "white",
        marginLeft: "2%",
        // backgroundColor: "red",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "85%",
        },
    },
    MyVideo_container: {

        color: "white",
        // backgroundColor: "black",

        border: "1",
        borderRadius: "8px",


        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
            width: "80%",
            height: "80%",
            marginRight: "4px",
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
        right: "2%",
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
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, room, leaveCall } = useContext(SocketContext);
    // useEffect(() => {
    //     console.log("after setting ref");
    //     setConfig({ audio: true, video: true });
    // }, [])
    const handleCallEnd = () => {
        // console.log("history ", props.history);
        props.history.push("/")
        leaveCall()
    }

    const [openPermissionBox, setOpenPermision] = useState(false);
    const onAdmitUserHandler = () => {
        setOpenPermision(false);
    }

    const [openCallInfo, setOpenCallInfo] = useState(false);
    const openCallInfoHandler = () => {
        setOpenCallInfo(true);
    }
    const closeCallInfoHandler = () => {
        setOpenCallInfo(false);
    }

    console.log("at video box", room);

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            direction="column">
            <Grid
                container
                direction="row"

                alignItems="center"

                className={classes.Video_Container}
            >
                {
                    room.length > 0 && (
                        <Grid className={classes.SenderVideo_container}>

                            <video playsInline height="100%" width="100%" ref={userVideo} autoPlay className={classes.video}></video>

                            <Grid>
                                <Typography variant="h5" gutterBottom>{call ? call.name : 'UserName'}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    stream && room.length == 0 && (
                        <Grid
                            className={classes.MyVideo_container + " " + (!callAccepted || callEnded ? classes.fullScreen : classes.halfScreen)}>

                            <video ref={myVideo} muted={true} height="100%" width="100%" autoPlay className={classes.video}></video>

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
                        <MicIcon style={{ fontSize: 32 }} />
                    </IconButton>

                    <IconButton color="primary" className={classes.button} aria-label="Turn Video off">
                        <VideocamIcon style={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton color="secondary" className={classes.button} aria-label="End Call" onClick={handleCallEnd}>
                        <CallEndIcon style={{ fontSize: 32 }} />
                    </IconButton>

                    <IconButton color="primary" onClick={openCallInfoHandler} className={classes.button} aria-label="Call Details">
                        <MoreVertIcon />
                    </IconButton>
                    {openCallInfo && (<DialogBox openCallInfo onClosingDialogBox={closeCallInfoHandler} />)
                    }



                    {call != null && call.isReceivedCall && !callAccepted && (
                        <Notification_toAcceptCall
                            user={call.name}
                            openPermissionBox
                            onAdmitUser={onAdmitUserHandler} />
                    )}


                    {/* 
                    {call != null && call.isReceivedCall && !callAccepted && setOpenPermision(true)}

                    <Notification_toAcceptCall
                        openPermissionBox
                        onAdmitUser={onAdmitUserHandler} /> */}
                </Grid>

            </Grid>

        </Grid>
    );
}

export default withRouter(VideoBox);

