import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { SocketContext } from '../../SocketContext';
import { Box, Grid } from '@material-ui/core';

export default function Notification_toAcceptCall() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <Grid>
            {/* {
                call.isReceivedCall && !callAccepted && (
                    { handleClickOpen }
                )
            } */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>
            <Dialog
                // fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="UserAcceptPermission"
            >
                <DialogTitle id="responsive-dialog-title">{"User is Calling..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"user"} want permission to join the call.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} fullWidth color="secondary">
                        Deny
                    </Button>
                    <Button variant="contained" autoFocus onClick={answerCall} color="primary" fullWidth>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
