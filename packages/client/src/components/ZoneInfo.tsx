import { BaseComponentProps, noSelect } from '../util/styling';
import { createStyles, SvgIcon, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) => {
    const { divider } = theme.palette;
    return createStyles({
        main: {
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            borderTop: `1px solid ${divider}`
        },
        icon: {
            height: '100%',
            width: '100%'
        },
        text: noSelect({
            position: 'absolute',
            alignSelf: 'center',
            fontWeight: 800,
            fontSize: '110%'
        }) as CSSProperties
    });
};
export interface ZoneInfoProps extends WithStyles<typeof styles>, BaseComponentProps {
    num: number;
    icon: any;
    id: string;
}

class ZoneInfo extends React.PureComponent<ZoneInfoProps> {

    public render() {
        const { num, icon, style, classes } = this.props;
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
                <Typography
                    className={classes.text}
                >
                    {num}
                </Typography>
            </article>

        );
    }
}

export default withStyles(styles)(ZoneInfo);
