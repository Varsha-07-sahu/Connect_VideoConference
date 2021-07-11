import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Box } from '@material-ui/core';
import { useContext } from 'react';
import { SocketContext } from '../../SocketContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

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

export default function DialogBox(props) {
    const classes = useStyles(props);
    const { name, me, showJoin, setShowJoin } = useContext(SocketContext);
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleJoin = () => {
        setShowJoin(false);
    }




    return (
        <Box className={classes.button}>
            {/* {showJoin && (
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                    New meeting
                </Button>)} */}
            {/* // ) : (
            //     <IconButton color="primary" onChange={handleClickOpen} className={classes.button} aria-label="Call Details">
            //         <MoreVertIcon fontSize="large" />
            //     </IconButton>
            // )} */}

            <Dialog open={props.openCallInfo} onClose={props.onClosingDialogBox()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Here's is the ID to your meeting </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hello {name},<br />
                        Copy this id and send it to people that you want to connect with.

                    </DialogContentText>

                    {/* {console.log(me)} */}
                    <CopyToClipboard onCopy={() => { console.log("copied") }} text={me} className={classes.margin}>
                        <Button variant="contained" color="primary" startIcon={<Assignment fontSize="large" />}>
                            Copy Meeting ID
                        </Button>
                    </CopyToClipboard>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClosingDialogBox()} color="primary">
                        Cancel
                    </Button>
                    {showJoin && (
                        <Link to="/Join">
                            <Button color="primary" onChange={handleJoin && props.onClosingDialogBox()}>
                                Join
                            </Button>
                        </Link>
                    )}

                </DialogActions>
            </Dialog>
        </Box>
    );
}
