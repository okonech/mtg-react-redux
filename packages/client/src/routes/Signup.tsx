import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignUp() {
    const classes = useStyles({});

    return (
        <React.Fragment>
            <div style={{ display: 'inline-block' }} />
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate={true}>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12} sm={6}>
                                <TextField
                                    autoComplete='fname'
                                    name='firstName'
                                    variant='outlined'
                                    required={true}
                                    fullWidth={true}
                                    id='firstName'
                                    label='First Name'
                                    autoFocus={true}
                                />
                            </Grid>
                            <Grid item={true} xs={12} sm={6}>
                                <TextField
                                    variant='outlined'
                                    required={true}
                                    fullWidth={true}
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='lname'
                                />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <TextField
                                    variant='outlined'
                                    required={true}
                                    fullWidth={true}
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <TextField
                                    variant='outlined'
                                    required={true}
                                    fullWidth={true}
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth={true}
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container={true} justify='flex-end'>
                            <Grid item={true}>
                                <Link href='#' variant='body2'>
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    );
}
