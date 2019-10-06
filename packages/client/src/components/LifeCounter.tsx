import { BaseComponentProps, noSelect } from '../util/styling';
import { createStyles, IconButton, SvgIcon, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { MappedLifeCounter } from '../containers/LifeCounter';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import React from 'react';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

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

export interface LifeCounterProps extends WithStyles<typeof styles>, BaseComponentProps, MappedLifeCounter {
    life: number;
    icon: any;
    player: string;
}

const LifeCounter = (props: LifeCounterProps) => {
    const { life, icon, player, style, classes, setLife } = props;

    const click = (num: number) => () => setLife(player, life + num);


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
                <IconButton
                    onClick={click(-1)}
                    color='secondary'
                    className={classes.button}
                >
                    <RemoveCircle />
                </IconButton >
                <Typography
                    className={classes.text}
                >
                    {life}
                </Typography>
                <IconButton
                    onClick={click(1)}
                    color='secondary'
                    className={classes.button}
                >
                    <AddCircle />
                </IconButton >
            </span>

        </article>
    );
};

export default withStyles(styles)(LifeCounter);
