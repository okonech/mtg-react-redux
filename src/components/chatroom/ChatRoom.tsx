import { IconButton, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

/* ----------------- */
const styles = (theme: Theme) => {
    return createStyles({
        root: {
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        },
        chatLog: {
            overflowY: 'scroll',
            padding: '8px',
            scrollbarWidth: 'thin',
            flexGrow: 1,
            height: 0,
            scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`
        },
        composeInput: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
        },
        input: {
            flex: 1,
            marginTop: '8px',
            margin: '4px'
        },
        chatRoomMessage: {
            display: 'flex',
            paddingBottom: '4px'
        },
        messageText: {
            padding: '8px 0px 0px 16px'
        },
        divider: {
            marginBottom: '8px'
        }
    });
};

const ChatRoom = (props) => {

    const { classes, style } = props;

    let images = [
        {
            name: 'Shimmery Boi', avatar: '/images/Shimmery Boi.png',
            message: 'That card is bad'
        },
        {
            name: 'Jhoi Rider', avatar: '/images/Jhoi Rider.png',
            message: 'Playing good cards sounds too hard'
        },
        {
            name: 'Hulkster', avatar: '/images/Hulkster.png',
            message: 'Cut all your pet cards'
        },
        {
            name: 'Turns McGee', avatar: '/images/Turns McGee.png',
            message: 'Doran is competitive. I beat full power pods with it regularly'
        }
    ];

    for (let i = 0; i < 3; i++) {
        images = images.concat(images);
    }

    return (
        <Paper className={classes.root} style={style}>
            <div className={classes.chatLog}>
                {images.map((item, index) => {
                    return (
                        <React.Fragment
                            key={item.name}
                        >
                            <div key={index} className={classes.chatRoomMessage}>
                                <Avatar alt='Remy Sharp' src={item.avatar} />
                                <div className={classes.messageText}>
                                    {item.message}
                                </div>
                            </div>
                            <Divider className={classes.divider} key={index} />
                        </React.Fragment>
                    );
                })}

            </div>
            <div className={classes.composeInput}>
                <TextField
                    id='outlined-email-input'
                    label='Chat message'
                    className={classes.input}
                    rows='1'
                    margin='normal'
                    variant='outlined'
                />
                <IconButton color='primary' aria-label='Send'>
                    <SendIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default withStyles(styles)(ChatRoom);
