import { Grid, IconButton, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useContext, useState } from "react";
import MessageBox from "./MessageBox";
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { SocketContext } from "../../../SocketContext";
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        border: "1 solid black",
        borderRadius: "8px",
        height: "100%",
        width: "100%",

    },
    body: {
        backgroundColor: "white",
        overflow: "auto",
        height: "90%",
        width: "100%",
    },
    input_footer: {
        height: "10%",
        // padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#e3e5e8",

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,

    },
    iconButton: {
        padding: 10,
    },

}));

export default function ChatWindow(props) {
    const classes = useStyles(props);
    const { chats, sendMessage } = useContext(SocketContext);
    const [message, setMessage] = useState("");
    // console.log("in chat window chats", chats);
    const handleMessageSend = () =>{
        if(!message.trim()){
            return;
        }
        sendMessage(message.trim());
        setMessage("");
    }
    const handleKeyUp = (e) => {
        if(e.key === "Enter" || e.keyCode === 13){
            handleMessageSend();
        }
    }
    return (
        <Grid className={classes.root}>
            <List container direction="column" className={classes.body}>
                {chats.map((content) => (
                    <MessageBox
                        message={content.message}
                        name={content.name}
                        time={content.time} />
                ))}
            </List>
            <Grid className={classes.inputFooter}>

<<<<<<< HEAD
                <Paper component="form" className={classes.input_footer}>
=======
                {/* <TextField id="filled-basic" label="Type your message" variant="filled" >
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                >
                    Send
                </Button> */}
                <Paper className={classes.input_footer}>
>>>>>>> 73b6ac33d902323f24b4372cfa7480068099afd0

                    <InputBase
                        autoFocus="true"
                        className={classes.input}
                        placeholder="Type your message"
                        value={message}
                        onKeyUp={handleKeyUp}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <IconButton onClick={handleMessageSend} className={classes.iconButton}>
                        <SendIcon color="primary" />
                    </IconButton>

                </Paper>

            </Grid>
        </Grid>
    );
}