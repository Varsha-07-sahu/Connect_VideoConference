import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { withRouter } from 'react-router-dom';
import DialogBox from "../Start_page/DialogBox";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import { useState } from "react";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({

    Option_container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#1a1a1a",
    },
    Chat_participants_optionBox: {
        position: "absolute",
        right: "2%",
    }

}));

export default function OptionFooter(props) {
    const classes = useStyles(props);

    const [openCallInfo, setOpenCallInfo] = useState(false);
    const openCallInfoHandler = () => {
        setOpenCallInfo(true);
    }
    const closeCallInfoHandler = () => {
        setOpenCallInfo(false);
    }

    const { leaveCall } = useContext(SocketContext);
    const handleCallEnd = () => {
        // console.log("history ", props.history);
        props.history.push("/")
        leaveCall()
    }
    const chatWindowHandler = () => {
        if (props.sideBox === 0) {
            props.onOpenChatWindow();
        }
        else if (props.sideBox === 1) {
            props.onCloseSideWindow();
        }
        else {    //props.sideBox=2
            props.onOpenChatWindow();
        }
    }

    const peopleWindowHandler = () => {
        if (props.sideBox === 0) {
            props.onOpenPeopleWindow();
        }
        else if (props.sideBox === 1) {
            props.onOpenPeopleWindow();
        }
        else {    //props.sideBox=2
            props.onCloseSideWindow();
        }
    }
    // const openChatWindowHandler = () => {
    //     if (props.chatWindow)
    //         props.onChatWindow(true);
    //     else
    //         props.onChatWindow(false);
    // }
    // const openParticipantsWindowHandler = () => {
    //     if (props.participantsWindow)
    //         props.onParticipantsWindow(true);
    //     else
    //         props.onParticipantsWindow(false);
    // }

    return (
        <Grid
            container
            direction="row"
            className={classes.Option_container}
            justify="center"
            alignItems="center">
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



            </Grid>
            <Grid className={classes.Chat_participants_optionBox}>

                <IconButton color="primary" onClick={chatWindowHandler} className={classes.button} aria-label="Turn Video off">
                    <ChatIcon style={{ fontSize: 32 }} />
                </IconButton>

                <IconButton color="secondary" onClick={peopleWindowHandler} className={classes.button} aria-label="End Call" >
                    <GroupIcon style={{ fontSize: 32 }} />
                </IconButton>

                <IconButton color="primary" onClick={openCallInfoHandler} className={classes.button} aria-label="Call Details">
                    <InfoIcon style={{ fontSize: 32 }} />
                </IconButton>
                {openCallInfo && (<DialogBox openCallInfo onClosingDialogBox={closeCallInfoHandler} />)}
            </Grid>

        </Grid>
    );
}