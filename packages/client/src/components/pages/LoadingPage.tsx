import { CircularProgress, createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import Navbar from '../../containers/Navbar';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            display: 'grid',
            gridTemplateRows: `auto 1fr`,
            height: '100%',
            width: '100%'
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.background.default
        }
    });
};

interface LoadingPageProps extends WithStyles<typeof styles> {

}

const LoadingPage = (props: LoadingPageProps) => {
    const { classes } = props;

    return (
        <section className={classes.main}>
            <Navbar />
            <span className={classes.container}>
                <CircularProgress color='secondary' size='140px' thickness={1.5} />
            </span>
        </section>
    );
};

export default withStyles(styles)(LoadingPage);
