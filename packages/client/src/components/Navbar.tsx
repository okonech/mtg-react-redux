import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MappedNavBar } from '../containers/Navbar';
import { BaseComponentProps } from '../util/styling';

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 10
    }
}));

interface NavBarProps extends BaseComponentProps, MappedNavBar {
}

const Navbar: React.SFC<NavBarProps> = (props) => {
    const { style, auth, logout } = props;
    const classes = useStyles({});
    const [anchorEl, updateAnchorEl] = useState<HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => updateAnchorEl(null);
    const handleMenu = (event) => updateAnchorEl(event.currentTarget);

    if (auth.uid) {
        console.log('logged in');
    }

    // need to make protected route route to auto redirect to non protected pages
    return (
        <AppBar position='static' style={style}>
            <Toolbar variant='dense'>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                    <MenuIcon />
                </IconButton>
                <Button color='inherit' component={RouterLink} to='/'>
                    Home
                </Button>
                <Button color='inherit' component={RouterLink} to='/deck-editor'>
                    Deck Editor
                </Button>
                <Button color='inherit' component={RouterLink} to='/test-game'>
                    Single Player
                </Button>
                <Button color='inherit' component={RouterLink} to='/test-two-player-game'>
                    Two Player
                </Button>
                <Button color='inherit' component={RouterLink} to='/test-four-player-game-other'>
                    Four Player
                </Button>
                <Button color='inherit' component={RouterLink} to='/test-four-player-game'>
                    Four Player Column
                </Button>
                <span className={classes.grow} />
                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup='true'
                        onClick={handleMenu}
                        color='inherit'
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu id='render-props-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem component={RouterLink} to='/player'>
                            Profile
                        </MenuItem>
                        <MenuItem component={RouterLink} to='/login' onClick={logout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
