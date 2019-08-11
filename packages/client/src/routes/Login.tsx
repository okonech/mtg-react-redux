import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Field, Form } from 'react-final-form';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { Link as RouterLink, LinkProps, Redirect } from 'react-router-dom';
import { loginAsync } from '../actions/authActions';
import { TextField } from '../packages/final-form-material-ui';
import { AppState } from '../reducers';
import { Omit } from '../util/propsHelper';
import { ValidateEmail } from '../util/validators';

const LoginGoogleButton = GoogleButton as any;

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
  },
  divider: {
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    '& hr': {
      flexGrow: 1
    }
  }
}));

// const HomeLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
//   (props, ref) => <RouterLink innerRef={ref as any} to='/' {...props} />
// );

const SignupLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef' | 'to'>>(
  (props, ref) => <RouterLink innerRef={ref as any} to='signup' {...props} />
);

interface LoginFields {
  email: string;
  password: string;
  remember: boolean;
}

const validate = (values: LoginFields) => {
  const errors: Partial<LoginFields> = {};
  const { email, password } = values;

  if (!(email || password)) {
    return errors;
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

  return errors;
};

interface LoginProps {
  auth: any;
  authError: string;
  logIn: typeof loginAsync.request;
  firebase: any;
}

const Login = (props: LoginProps) => {
  const classes = useStyles({});
  const { auth, authError, logIn, firebase } = props;

  const onSubmit = async (values) => {
    logIn(values);
  };

  const loginWithGoogle = () => {
    return firebase.login({ provider: 'google', type: 'popup' });
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
          Sign in
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          // tslint:disable-next-line: jsx-no-lambda
          render={({ handleSubmit, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit} noValidate={true} className={classes.form}>
              <Field
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth={true}
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus={true}
                component={TextField}
                type='text'
              />
              <Field
                variant='outlined'
                margin='normal'
                required={true}
                fullWidth={true}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                component={TextField}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              {authError ? <Typography variant='body2' color='error'>{authError}</Typography> : null}
              <Button
                type='submit'
                fullWidth={true}
                variant='contained'
                color='primary'
                disabled={submitting || pristine || invalid}
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          )}
        />
      </div>
      <Grid container={true}>
        <Grid item={true} xs={true}>
          <Link href='#' variant='body2'>
            Forgot password?
              </Link>
        </Grid>
        <Grid item={true}>
          <Link
            component={SignupLink}
          >
            {`Don't have an account? Sign Up`}
          </Link>
        </Grid>
      </Grid>
      <Grid container={true}>
        <Box className={classes.divider} mt={4} width='100%'>
          <Divider variant='middle' />
          or
          <Divider variant='middle' />
        </Box>
      </Grid>
      <Grid container={true} justify={'center'}>
        <Box mt={4}>
          <LoginGoogleButton onClick={loginWithGoogle} />
        </Box>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    firebase: getFirebase()
  };
};

const mapDispatchToProps = {
  logIn: loginAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
