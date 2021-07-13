import { Grid } from "@material-ui/core";
import OptionFooter from "./OptionFooter";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import VideoContainer from "./VideoContainer";
import SideWindow from "./SideWindow";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#b8e3f5",
        height: '100vh',
    },
    mainBody: {
        height: "92%",
        width: "100%",
    },
    videoContainer: {
        // backgroundColor: "white",
        // width: "77%",
        // height: "100%",
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
    const [sideBox, setSideBox] = useState(0);

    // 0 : chat=false && people=false
    // 1 : chat= true && people=false
    // 2 : chat= false && people=true

    const openChatWindowHandler = () => {
        setSideBox(1);
    }
    const openPeopleWindowHandler = () => {
        setSideBox(2);
    }
    const closeSideWindowHandler = () => {
        setSideBox(0);
    }


    // const [chatWindow, setChatWindow] = useState(false);
    // const [participantsWindow, setParticipantsWindow] = useState(false);
    // const ChatWindowHandler = (state) => {
    //     if (state) {
    //         setParticipantsWindow(false);
    //         setChatWindow(true);
    //         console.log("chat=true, people=false");
    //     }
    //     else {
    //         setChatWindow(false);
    //         // setParticipantsWindow(true);
    //         console.log("chat=false");
    //     }
    //     console.log("chatWindow change");
    // }

    // const participantsWindowHandler = (state) => {
    //     if (state) {
    //         setChatWindow(false);
    //         setParticipantsWindow(true);
    //         console.log("chat=false, people=true");
    //     }
    //     else {
    //         setParticipantsWindow(false);
    //         // setChatWindow(true);
    //         console.log("people=false");
    //     }
    //     console.log("ParticipantsWindow change");
    // }
    // console.log("inside main page chatWindow=", chatWindow, " , peopleWindow=", participantsWindow);

    // useEffect(() => {
    //     console.log("updated in main page chatWindow=", chatWindow, " , peopleWindow=", participantsWindow);
    // }, [chatWindow, participantsWindow]);

    return (
        <Grid className={classes.root}
            container
            direction="column">
            <Grid className={classes.mainBody} container direction="row">
                {/* + " " + (!chatWindow && !participantsWindow) ? classes.fullScreen : classes.halfScreen} */}
                <Grid className={classes.videoContainer + " " + ((sideBox === 0) ? classes.fullScreen : classes.halfScreen)} >
                    <VideoContainer />
                </Grid>
                {sideBox != 0 && (
                    <Grid className={classes.sideWindow}>
                        <SideWindow
                            sideBox={sideBox}
                            onOpenChatWindow={openChatWindowHandler}
                            onOpenPeopleWindow={openPeopleWindowHandler}
                            onCloseSideWindow={closeSideWindowHandler} />
                    </Grid>
                )}
            </Grid>
            <Grid className={classes.optionFooter}>
                <OptionFooter
                    sideBox={sideBox}
                    onOpenChatWindow={openChatWindowHandler}
                    onOpenPeopleWindow={openPeopleWindowHandler}
                    onCloseSideWindow={closeSideWindowHandler} />
            </Grid>

        </Grid>
    );
}