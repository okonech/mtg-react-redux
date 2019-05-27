import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import ChatRoom from './chatroom/ChatRoom';
import PlayerList from './chatroom/PlayerList';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            borderLeft: `1px solid ${theme.palette.divider}`
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            height: '100%'
        },
        // TODO: clean these styles
        drawerOpen: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            top: 'auto',
            position: 'inherit',
            borderLeft: `1px solid ${theme.palette.divider}`,
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(7) + 1
            },
            top: 'auto',
            position: 'inherit',
            borderLeft: `1px solid ${theme.palette.divider}`,
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.action.hover}`
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);

const DrawerRightMini = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    const closedButton = (
        <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
        </IconButton>
    );

    const openButton = (
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
    );

    const closedDrawer = (
        <PlayerList />
    );

    const openDrawer = (
        <React.Fragment>
            <PlayerList />
            <Divider />
            <ChatRoom />
        </React.Fragment>
    );

    return (
        <Drawer
            variant='permanent'
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })
            }}
            open={open}
        >
            <div className={classes.toolbar}>
                {open ? openButton : closedButton}
            </div>
            <Divider />
            {open ? openDrawer : closedDrawer}
        </Drawer>
    );
};

export default DrawerRightMini;
