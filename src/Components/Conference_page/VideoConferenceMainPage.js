import { Grid } from "@material-ui/core";
import OptionFooter from "./OptionFooter";
import { makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import VideoContainer from "./VideoContainer";
import SideWindow from "./SideWindow";
import { SocketContext } from "../../SocketContext";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "black",
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
    const { me } = useContext(SocketContext);

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

    const [mainUserId, setMainUserId] = useState(me);

    const handlePinUser = (userId) => {
        console.log("handle Pin", userId);
        setMainUserId(userId);
    }

    return (
        <Grid className={classes.root}
            container
            direction="column">
            <Grid className={classes.mainBody} container direction="row">
                <Grid className={classes.videoContainer + " " + ((sideBox === 0) ? classes.fullScreen : classes.halfScreen)} >
                    <VideoContainer userId={mainUserId} />
                </Grid>
                {sideBox != 0 && (
                    <Grid className={classes.sideWindow}>
                        <SideWindow
                            handlePinUser = {handlePinUser}
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