import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
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

export default function MessageBox(props) {
    const classes = useStyles(props);
    const avatar_letter = props.name.charAt(0);
    const hrs = props.time.getHours();
    const min = props.time.getMinutes();


    return (
        // <List className={classes.root}>
        <ListItem>
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
                    <Typography component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary">{hrs >= 12 ? hrs - 12 + ":" + min + " p.m." : hrs + ":" + min + " a.m."}</Typography>
                </React.Fragment>}
                secondary={props.message} />
        </ListItem>
        // </List>
    );
}
