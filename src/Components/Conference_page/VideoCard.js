import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { Grid, Typography } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { useEffect, useRef } from "react";

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
        height: "100%",
        width: "100%",
        // padding: "10px",
    },
    title: {
        fontSize: "14",
    },
    pos: {
        marginBottom: "12",
    },
});



export default function VideoCard(props) {
    const classes = useStyles(props);
    const { stream, me, room } = useContext(SocketContext);

    useEffect(() => {
        /// search corresponding stream for user id
        if (props.userId === me) {
            mainVideRef.current.srcObject = stream;
            return;
        }
        let user = room.find(r => r.id === props.userId);
        if (user) mainVideRef.current.srcObject = user.stream;
    }, [props.userId])

    const mainVideRef = useRef();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <video muted ref={mainVideRef} height="100%" width="50%" autoPlay className={classes.video} />
                <Typography variant="body2" component="p">
                    {props.name}
                </Typography>
            </CardContent>

        </Card>
    );
}
