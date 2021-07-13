import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import UserVideoContainer from "./UserVideoContainer";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    root: {
        border: "1 solid black",
        borderRadius: "8px",
        height: "100%",
        width: "100%",
    },
    MyVideo_container: {
        // padding: "5px",
        height: "100%",
        width: "100%",
    }
}));


export default function VideoContainer(props) {
    const classes = useStyles(props);
<<<<<<< HEAD
    const { room, name, myVideo, stream, setConfig, callAccepted, callEnded } = useContext(SocketContext);


=======
    const { room, stream, setConfig, callAccepted, callEnded, sendMessage } = useContext(SocketContext);

    useEffect(() => {
        console.log("after setting ref");
        sendMessage("hello everyone")
        // setConfig({ audio: true, video: true });
    }, [])
>>>>>>> 73b6ac33d902323f24b4372cfa7480068099afd0

    return (

        <Grid className={classes.root}>
            {stream && (
                <Grid
                    className={classes.MyVideo_container}>
                    <UserVideoContainer
                        name={name}
                        id={"1"}
                        video={myVideo} />
                    {
                        console.log("my vidoe ref=", myVideo)
                    }
                    {/* <Grid>
                        {console.log("entered in video")}
                        <video muted ref={myVideo} height="100%" width="100%" autoPlay className={classes.video}></video>
                    </Grid>
                    <Grid>
                        <Typography color="white" variant="h5" gutterBottom>{"You"}</Typography>
                    </Grid> */}
                </Grid>
            )}
            {console.log(room[0])}
            {/* 
            {room.map((content) => (
                <UserVideoContainer
                    name={content.name}
                    id={content.id}
                    video={content.stream} />
            ))} */}
        </Grid>
    )
}