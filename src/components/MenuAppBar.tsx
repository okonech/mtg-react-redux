import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 10
    }
};

interface MenuProps extends WithStyles<typeof styles> {
    style?: React.CSSProperties;
}

const HomeLink = (props) => <Link to='/player' {...props} />;
const OnePlayerLink = (props) => <Link to='/test-game' {...props} />;
const TwoPlayerLink = (props) => <Link to='/test-two-player-game' {...props} />;
const FourPlayerLink = (props) => <Link to='/test-four-player-game-other' {...props} />;

const MenuAppBar = (props: MenuProps) => {
    const { classes, style } = props;
    const [anchorEl, updateAnchorEl] = useState<HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => updateAnchorEl(null);
    const handleMenu = (event) => updateAnchorEl(event.currentTarget);

    return (
        <AppBar position='static' style={style}>
            <Toolbar variant='dense'>
                <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                    <MenuIcon />
                </IconButton>
                <Button color='inherit' component={HomeLink}>
                    Home
                </Button>
                <Button color='inherit' component={OnePlayerLink}>
                    Single Player
                </Button>
                <Button color='inherit' component={TwoPlayerLink}>
                    Two Player
                </Button>
                <Button color='inherit' component={FourPlayerLink}>
                    Four Player
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(MenuAppBar);
