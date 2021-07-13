import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from "react";
import { Divider } from "@material-ui/core";
import { SocketContext } from "../../SocketContext";
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import InputBase from '@material-ui/core/InputBase';
import { Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ChatWindow from "./ChatFeature/ChatWindow";
import AllUserWindow from "./DisplayUserWindow/AllUserWindow";
import { useEffect } from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        border: "1 solid black",
        borderRadius: "8px",
        height: "100%",
        width: "100%",
    },
    header: {
        height: "10%",
        width: "100%",
    },
    body: {
        height: "90%",
        width: "100%",
    },
    titleRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        // fontWeight: "bold",
        fontSize: "20px",
        color: "grey",
    },
    closeButton: {
        position: "absolute",
        right: "2px",
        top: "2px",
    }
}));



export default function SideWindow(props) {
    const classes = useStyles(props);
    const closeHandler = () => {
        props.onCloseSideWindow();
    }
    // console.log("in side window chatWindow=", props.chatWindow, " ,people=", props.participantsWindow);

    // useEffect(() => {
    //     console.log("updated in sidewindow page chatWindow=", props.chatWindow, " , peopleWindow=", props.participantsWindow);
    // }, [props.chatWindow, props.participantsWindow]);

    return (
        <Grid className={classes.root}>
            <Grid container direction="row" className={classes.header}>
                <List className={classes.titleRoot}>
                    <ListItem>
                        <ListItemText primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {/* People */}
                                    {props.sideBox === 1 && "In-call messages"}
                                    {props.sideBox === 2 && "People in call"}
                                </Typography>
                            </React.Fragment>} />
                    </ListItem>
                </List>
                <Grid>
                    <IconButton className={classes.closeButton} onClick={closeHandler}>
                        <CloseIcon />
                    </IconButton>
                </Grid>

            </Grid>
            {/* <Divider variant="inset" component="li" /> */}
            <Grid className={classes.body}>
                {props.sideBox === 1 && (
                    <ChatWindow />
                )}
                {props.sideBox === 2 && (
                    <AllUserWindow />
                )}
                {/* <AllUserWindow /> */}
            </Grid>
        </Grid>
    );
}