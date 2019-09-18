import { createStyles, Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const styles = (theme: Theme) => createStyles({
    main: {
        display: 'grid',
        gridTemplateRows: `1fr`,
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

const LoadingSpinner = (props: WithStyles<typeof styles>) => {
    const { classes } = props;

    return (
        <section className={classes.main}>
            <span className={classes.container}>
                <CircularProgress color='secondary' size='140px' thickness={1.5} />
            </span>
        </section>
    );
};

export default withStyles(styles)(LoadingSpinner);
