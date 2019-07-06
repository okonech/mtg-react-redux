
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        padding: 5,
        wordWrap: 'break-word',
        display: 'inline',
        fontSize: '.8rem',
        backgroundColor: theme.palette.getContrastText(theme.palette.text.primary)
    }
}));

const Signup = () => {
    const classes = useStyles({});

    return (
        <Paper>
            <Typography className={classes.text}>
                Sign Up
            </Typography>
        </Paper>
    );
};

export default Signup;
