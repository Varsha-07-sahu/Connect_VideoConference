import { Grid, makeStyles } from "@material-ui/core";
import { GpsFixed } from "@material-ui/icons";



const useStyles = makeStyles((theme) => ({
    main_box: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%) scale(0)",
        transition: "200ms ease-in-out",
        // border: "1px solid black",
        borderRadius: "10px",
        zIndex: "10",
        backgroundColor: "white",
        width: "500px",
        maxWidth: "70%",
        fontFamily: "sans-serif",
    },
    header: {
        padding: "15px 15px",
        justifyContent: "space-between",
        display: "flex",
        borderBottom: "1px solid grey",
    },
    title: {
        fontSize: "1.25rem",
        // fontWeight: "bold",
    },
    close_button: {
        cursor: "pointer",
        border: "none",
        outlined: "none",
        background: "none",
        fontSize: "1.25rem",
        fontWeight: "bold",
    },
    body: {
        padding: "15px 15px",
        color: "grey",
    },

    overlay: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        transition: "200ms ease-in-out",
        PointerEvent: "none",
    }

}));

export default function PopUpGetId(props) {
    const classes = useStyles(props);

    return (
        <Grid>
            <Grid className={classes.main_box}>
                <Grid
                    className={classes.header}
                    direction="row"
                    alignItems="center">
                    <Grid className={classes.title}>Here's is the ID to your meeting </Grid>
                    <Grid>
                        <button className={classes.close_button}>&times;</button>
                    </Grid>
                </Grid>
                <Grid className={classes.body}>
                    <Grid className={classes.body_text}>
                        Copy this id and send it to people that you want to meet with. Make sure you also save it for future.
                        njcksdkhffer njhfdskcxsmllhejkw hdjskxnsasnjkfhef fnskakc mdskncmsgfew dhewwhdewnxx ndsjkk
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </Grid>

            <Grid className={classes.overlay}>

            </Grid>
        </Grid>



    );
}