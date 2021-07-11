import React from 'react';
import { Route } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';
import { useContext, useState } from 'react';
import { SocketContext } from '../../SocketContext';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import JoiningPage from '../../Screens/JoiningPage';
import { CancelScheduleSendRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    button: {
        '& > *': {
            margin: theme.spacing(2),
        },
        paper_connect: {
            backgroundImage: 'url("./Desktop_image.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
    },
}));

export default function JoinWithCode(props) {
    const classes = useStyles(props);
    const [idToCall, setIdToCall] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { name, callUser } = useContext(SocketContext);


    return (
        <Box className={classes.button}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Join with id
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Here's is the ID to your meeting </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hello {name},<br />
                        Enter the meeting id to connent with people.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ID"
                        label="Enter meeting ID"
                        type="text"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                        fullWidth

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Link to="/Join">
                        <Button onClick={() => callUser(idToCall)} color="primary">
                            Join
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>

        </Box>
    );
}