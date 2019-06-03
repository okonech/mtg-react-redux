import { createStyles, IconButton, SvgIcon, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import React from 'react';
import { noSelect } from '../util/styling';

const styles = (theme: Theme) => {
    const { divider } = theme.palette;
    return createStyles({
        main: {
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            borderTop: `1px solid ${divider}`,
            overflow: 'hidden'

        },
        icon: {
            height: '100%',
            width: '90%'
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            alignSelf: 'center',
            boxSizing: 'border-box',
            padding: '4px'
        },
        text: noSelect({
            alignSelf: 'center',
            fontWeight: 800,
            fontSize: '110%'
        }) as CSSProperties,
        button: {
            marginLeft: '-8px',
            marginRight: '-8px'
        }
    });
};

export interface LifeCounterProps extends WithStyles<typeof styles> {
    life: number;
    icon: any;
    style?: React.CSSProperties;
}

const LifeCounter = (props: LifeCounterProps) => {
    const { life, icon, style, classes } = props;
    return (
        <article
            className={classes.main}
            style={style}
        >
            <SvgIcon
                color='primary'
                className={classes.icon}
            >
                {icon}
            </SvgIcon>
            <span className={classes.row} >
                <IconButton color='secondary' className={classes.button}>
                    <RemoveCircle />
                </IconButton >
                <Typography
                    className={classes.text}
                >
                    {life}
                </Typography>
                <IconButton color='secondary' className={classes.button}>
                    <AddCircle />
                </IconButton >
            </span>

        </article>
    );
};

export default withStyles(styles)(LifeCounter);
