import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../SocketContext';
import DialogBox from '../Components/Start_page/DialogBox';
import JoinWithCode from '../Components/Start_page/JoinWithCode';

import VideoCallRoundedIcon from '@material-ui/icons/VideoCallRounded';
//import BackgroungImage from '.\Images\BackgroungImage';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("./BackgroungImage.png")',
        height: '100vh',
    },
    side_image: {

        backgroundImage: 'url("./Desktop_image.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "45%",
        width: "30%",
        [theme.breakpoints.down('xs')]: {
            width: "80%",
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header: {
        height: "15%",
        width: "100%",
        border: "1",
    },
    // logo: {
    //     marginLeft: "5%",
    //     // marrginTop: "2%",
    //     backgroundImage: 'url("./Connnect.png")',
    //     // backgroundImage: 'url("./Desktop_image.jpg")',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundColor:
    //         theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: "100%",
    //     width: "8%",
    //     // zIndex: "10",
    // },
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

export default function Welcome_page(props) {
    console.log("welcome page constructor")
    const { name, setName } = useContext(SocketContext);
    // useEffect(() => {
    //     console.log("check1");
    // }, [])
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles(props);

    const [openCallInfo, setOpenCallInfo] = useState(false);
    const openCallInfoHandler = () => {
        setOpenCallInfo(true);
    }
    const closeCallInfoHandler = () => {
        setOpenCallInfo(false);
    }
    return (
        <Grid
            container
            component="main"
            className={classes.root}
        >
            {/* <Grid className={classes.header}>
                <Grid item className={classes.logo} />
            </Grid> */}
            <Grid
                container
                alignItems="center"
                justify="space-evenly"

            >
                <Grid
                    item
                    className={classes.side_image}
                >
                </Grid>
                <Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid>
                            <Avatar className={classes.avatar}>
                                <VideoCallRoundedIcon />
                            </Avatar>
                        </Grid>
                        <Grid>
                            <Typography component="h1" variant="h5">
                                Let's Connect
                            </Typography>
                        </Grid>
                    </Grid>

                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Enter your Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        ></TextField>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button variant="contained" color="secondary" onClick={openCallInfoHandler}>
                                New meeting
                            </Button>
                            {openCallInfo && (<DialogBox openCallInfo onClosingDialogBox={closeCallInfoHandler} />)}

                            <JoinWithCode></JoinWithCode>
                        </Grid>


                    </form>
                </Grid>
            </Grid>

        </Grid>
    );
}