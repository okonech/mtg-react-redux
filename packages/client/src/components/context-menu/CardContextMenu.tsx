import { MenuItem as ContextMenuItem } from 'react-contextmenu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MappedCardContextMenuProps } from '../../containers/context-menu/CardContextMenu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            backgroundColor: theme.palette.type === 'light' ? '#EDE5E5' : '#202020'
        }
    })
);

const CardContextMenu: React.FC<MappedCardContextMenuProps> = (props) => {
    const { moveCards, zone, player, card, selected } = props;

    const classes = useStyles({});

    const getCardsIds = () => Array.from(new Set([...selected, card.id]));

    const topOfLibrary = () => {
        moveCards(zone.id, getCardsIds(), player.library, 100, 0, 0);
    };

    const bottomOfLibrary = () => {
        moveCards(zone.id, getCardsIds(), player.library, 0, 0, 0);
    };

    const hand = () => {
        moveCards(zone.id, getCardsIds(), player.hand, 100, 0, 0);
    };

    let topofLibraryItem, bottomOfLibraryItem, handItem = null;

    if (player.library !== zone.id) {
        topofLibraryItem = (
            <ContextMenuItem onClick={topOfLibrary}>
                <MenuItem>
                    <Typography>To Top of Library</Typography>
                </MenuItem>
            </ContextMenuItem>
        );
        bottomOfLibraryItem = (
            <ContextMenuItem onClick={bottomOfLibrary}>
                <MenuItem>
                    <Typography>To Bottom of Library</Typography>
                </MenuItem>
            </ContextMenuItem>
        );
    }

    if (player.hand !== zone.id) {
        handItem = (
            <ContextMenuItem onClick={hand}>
                <MenuItem>
                    To Hand
                </MenuItem>
            </ContextMenuItem>
        );
    }

    return (
        <Paper className={classes.main}>
            <MenuList>
                {topofLibraryItem}
                {bottomOfLibraryItem}
                {handItem}
            </MenuList>
        </Paper>
    );
};

export default CardContextMenu;
