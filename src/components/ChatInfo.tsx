import { createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            backgroundColor: 'green'
        }
    });
};

export interface ChatInfoProps extends WithStyles<typeof styles> {
    style?: React.CSSProperties;
}

const ChatInfo = (props: ChatInfoProps) => {
    const { style, classes } = props;
    return (
        <section
            style={style}
            className={classes.main}
        >
            <div style={{ height: '100%', width: 200 }} />
        </section>
    );
};

export default withStyles(styles)(ChatInfo);
