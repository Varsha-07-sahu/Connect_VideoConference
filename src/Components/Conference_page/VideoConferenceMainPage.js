import { Grid } from "@material-ui/core";
import OptionFooter from "./OptionFooter";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import VideoContainer from "./VideoContainer";
import SideWindow from "./SideWindow";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#282c34",
        height: '100vh',
    },
    mainBody: {
        height: "92%",
        width: "100%",
    },
    videoContainer: {
        width: "77%",
        height: "100%",
    },
    fullScreen: {
        width: "100%",
        height: "100%",
    },
    halfScreen: {
        width: "77%",
        height: "100%",
    },
    sideWindow: {
        height: "100%",
        width: "23%",
    },
    optionFooter: {
        height: "8%",
        width: "100%"
    }
}));


export default function VideoConferenceMainPage(props) {
    const classes = useStyles(props);
    const [chatWindow, setChatWindow] = useState(false);
    const [participantsWindow, setParticipantsWindow] = useState(false);
    const ChatWindowHandler = (state) => {
        if (state)
            setChatWindow(true);
        else
            setChatWindow(false);
        console.log("chatWindow change");
    }
    const participantsWindowHandler = (state) => {
        if (state)
            setParticipantsWindow(true);
        else
            setParticipantsWindow(false);
        console.log("ParticipantsWindow change");
    }


    return (
        <Grid className={classes.root}
            container
            direction="column">
            <Grid className={classes.mainBody} container direction="row">
                {/* + " " + (!chatWindow && !participantsWindow) ? classes.fullScreen : classes.halfScreen} */}
                <Grid className={classes.videoContainer + " " + ((!chatWindow && !participantsWindow) ? classes.fullScreen : classes.halfScreen)} >
                    <VideoContainer />
                </Grid>
                {
                    (chatWindow || participantsWindow) && (
                        <Grid className={classes.sideWindow}>
                            <SideWindow />
                        </Grid>
                    )
                }

            </Grid>
            <Grid className={classes.optionFooter}>
                <OptionFooter onChatWindow={ChatWindowHandler} onParticipantsWindow={participantsWindowHandler} />
            </Grid>

        </Grid>
    );
}