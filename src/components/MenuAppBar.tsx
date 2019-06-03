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
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

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

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
const HomeLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/player' {...props} />
);
const DeckEditorLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/deck-editor' {...props} />
);
const OnePlayerLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/test-game' {...props} />
);
const TwoPlayerLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/test-two-player-game' {...props} />
);
const FourPlayerLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/test-four-player-game-other' {...props} />
);
const FourPlayerColLink = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
    (props, ref) => <RouterLink innerRef={ref as any} to='/test-four-player-game' {...props} />
);

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
                <Button color='inherit' component={DeckEditorLink}>
                    Deck Editor
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
                <Button color='inherit' component={FourPlayerColLink}>
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
