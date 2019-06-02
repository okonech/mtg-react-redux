import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';

/* ----------------- */
const styles = (theme: Theme) => {
    return createStyles({
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
        listItem: {
            paddingLeft: '4px'
        },
        divider: {
            marginBottom: '8px'
        }
    });
};

const PlayerList = (props) => {

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
            {players.map((item, index) => {
                return (
                    <ListItem key={item.name} button={true} className={classes.listItem}>
                        <ListItemAvatar>
                            <Avatar alt={item.name} src={item.avatar} className={classes.player} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default withStyles(styles)(PlayerList);
