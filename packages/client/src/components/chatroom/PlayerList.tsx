import { Badge, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';

/* ----------------- */
const styles = (theme: Theme) =>
    createStyles({
        root: {
            maxHeight: '100%',
            maxWidth: '350px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`
        },
        player: {
            width: 45,
            height: 45
        },
        playerName: {

        },
        listItem: {
            paddingLeft: '4px'
        },
        online: {
            '& span': {
                top: 'initial',
                bottom: 0,
                height: '10px',
                width: '10px',
                right: '3px',
                backgroundColor: '#68B826'
            }
        },
        divider: {
            marginBottom: '8px'
        }
    });

const PlayerList: React.FC = (props: any) => {

    const { classes, style } = props;

    const players = [
        {
            name: 'Shimmery Boi', avatar: '/images/Shimmery Boi.png'
        },
        {
            name: 'Jhoi Rider', avatar: '/images/Jhoi Rider.png'
        },
        {
            name: 'Hulkster', avatar: '/images/Hulkster.png'
        },
        {
            name: 'Turns McGee', avatar: '/images/Turns McGee.png'
        }
    ];

    return (
        <List dense={true} className={classes.root} style={style}>
            {players.map((item) =>
                (
                    <ListItem key={item.name} button={true} className={classes.listItem}>
                        <ListItemAvatar>
                            <Badge color='secondary' variant='dot' className={classes.online}>
                                <Avatar alt={item.name} src={item.avatar} className={classes.player} />
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography variant='subtitle1' gutterBottom={true}>
                                {item.name}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                )
            )}
        </List>
    );
};

export default withStyles(styles)(PlayerList);
