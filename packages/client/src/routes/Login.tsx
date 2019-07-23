import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { login } from '../actions/authActions';
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
  logIn: typeof login;
}

const Login = (props: LoginProps) => {
  const classes = useStyles({});
  const { auth, authError, logIn } = props;

  const onSubmit = async (values) => {
    logIn(values);
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
    </Container>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logIn: (form) => dispatch(login(form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
