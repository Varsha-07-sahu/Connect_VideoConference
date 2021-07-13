import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Typography } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { IconButton } from '@material-ui/core';
// import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

export default function PersonBox(props) {
    const classes = useStyles(props);
    const avatar_letter = props.name.charAt(0);


    return (
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
                        {props.name + " "}
                    </Typography>
                    <IconButton onClick={() => console.log("pinned")}>
                        <PersonPinCircleIcon />
                    </IconButton>
                </React.Fragment>} />

        </ListItem>

    );
}
