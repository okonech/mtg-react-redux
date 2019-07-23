import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Link as RouterLink, LinkProps, Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { signup } from '../actions/authActions';
import { TextField } from '../packages/final-form-material-ui';
import { AppState } from '../reducers';
import { Omit } from '../util/propsHelper';
import { ValidateEmail } from '../util/validators';

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
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const LoginLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='login' {...props} />
);

interface SignUpFormFields {
    username: string;
    email: string;
    password: string;
    password2: string;
}

const validate = (values: SignUpFormFields) => {
    const errors: Partial<SignUpFormFields> = {};
    const { username, email, password, password2 } = values;

    if (!(username || email || password || password2)) {
        return errors;
    }

    if (!username) {
        errors.username = 'Required';
    }
    if (!email) {
        errors.email = 'Required';
    } else if (!ValidateEmail(email)) {
        errors.email = 'Invalid email';
    }

    if (!password) {
        errors.password = 'Required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (!password2) {
        errors.password2 = 'Required';
    } else if (password !== password2) {
        errors.password2 = 'Passwords must match';
    }
    return errors;
};

interface SignUpProps {
    auth: any;
    authError: string;
    signUp: typeof signup;
}

function SignUp(props: SignUpProps) {
    const classes = useStyles({});
    const { auth, authError, signUp } = props;

    const onSubmit = async (values: SignUpFormFields) => {
        const { password2, ...form } = values;
        signUp(form);
    };

    if (auth.uid) {
        return <Redirect to='/' />;
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                    </Typography>
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    // tslint:disable-next-line: jsx-no-lambda
                    render={({ handleSubmit, submitting, pristine, invalid }) => (
                        <form onSubmit={handleSubmit} noValidate={true} className={classes.form}>
                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={12}>
                                    <Field
                                        autoComplete='username'
                                        name='username'
                                        variant='outlined'
                                        required={true}
                                        fullWidth={true}
                                        id='username'
                                        label='Username'
                                        autoFocus={true}
                                        component={TextField}
                                        type='text'
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Field
                                        variant='outlined'
                                        required={true}
                                        fullWidth={true}
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                        component={TextField}
                                        type='text'
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Field
                                        variant='outlined'
                                        required={true}
                                        fullWidth={true}
                                        name='password'
                                        label='Password'
                                        type='password'
                                        id='password'
                                        autoComplete='current-password'
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Field
                                        variant='outlined'
                                        required={true}
                                        fullWidth={true}
                                        name='password2'
                                        label='Repeat Password'
                                        type='password'
                                        id='password2'
                                        autoComplete='current-password'
                                        component={TextField}
                                    />
                                </Grid>
                                {authError ? <Typography variant='body2' color='error'>{authError}</Typography> : null}
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth={true}
                                variant='contained'
                                color='primary'
                                disabled={submitting || pristine || invalid}
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                        </form>
                    )}
                />
                <Grid container={true} justify='flex-end'>
                    <Grid item={true}>
                        <Link
                            component={LoginLink}
                        >
                            {`Already have an account? Sign in`}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signUp: (form) => dispatch(signup(form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
