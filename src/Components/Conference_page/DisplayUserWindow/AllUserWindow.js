import { Grid, IconButton, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from "../../../SocketContext";
import Paper from '@material-ui/core/Paper';
import PersonBox from "./PersonBox";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import React from "react";
// import { Button } from "@material-ui/core";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
// import { IconButton } from '@material-ui/core';


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

        height: "100%",
        width: "100%",
    },
    item: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',

    },
    avatar: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    }

}));

export default function AllUserWindow(props) {
    const classes = useStyles(props);
    const { room, name } = useContext(SocketContext);
    const avatar_letter = name.charAt(0);
    const size = room.length;
    return (
        <Grid className={classes.root}>
            <Grid container direction="column" className={classes.body}>
                <List>
                    <ListItem className={classes.item}>

                        <ListItemText primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {size === 0 ? "Only you are in the call" : size + " people joined the call"}
                                </Typography>

                            </React.Fragment>} />
                    </ListItem>
                    <ListItem className={classes.item}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {avatar_letter}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {name + "(You)" + " "}
                                </Typography>
                                <IconButton onClick={() => console.log("change pin")}>
                                    <PersonPinCircleIcon />
                                </IconButton>
                            </React.Fragment>} />
                    </ListItem>

                    {room.map((content) => (
                        <PersonBox
                            name={content.name} />
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}