import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
  main: {
    paddingTop: theme.spacing.unit * 8,
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

interface LoginPageProps extends WithStyles<typeof styles> {
  style?: React.CSSProperties;
}

const PlayerLink = (props) => <Link to='player' {...props} />;

const LoginPage = (props: LoginPageProps) => {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin='normal' required={true} fullWidth={true}>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Input id='email' name='email' autoComplete='email' autoFocus={true} />
          </FormControl>
          <FormControl margin='normal' required={true} fullWidth={true}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input name='password' type='password' id='password' autoComplete='current-password' />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth={true}
            variant='contained'
            color='primary'
            component={PlayerLink}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(LoginPage);
