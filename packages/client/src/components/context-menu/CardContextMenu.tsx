import { MenuItem as ContextMenuItem } from 'react-contextmenu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MappedCardContextMenuProps } from '../../containers/context-menu/CardContextMenu';
import { PLAYER_ZONES } from './ContextMenu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            backgroundColor: theme.palette.type === 'light' ? '#EDE5E5' : '#202020'
        }
    })
);

const CardContextMenu: React.FC<MappedCardContextMenuProps> = (props) => {
    const { moveCardsFixCoords, zone, player, card, selected } = props;

    const classes = useStyles({});

    const getCardsIds = () => Array.from(new Set([...selected, card.id]));

    let libraryItems: ReactElement[] = null;

    if (player.library !== zone.id) {
        const topOfLibrary = () => {
            moveCardsFixCoords(zone.id, player.library, getCardsIds(), 100, 0, 0);
        };

        const bottomOfLibrary = () => {
            moveCardsFixCoords(zone.id, player.library, getCardsIds(), 0, 0, 0);
        };

        libraryItems = [
            (
                <ContextMenuItem
                    key={`library-top-move-item`}
                    onClick={topOfLibrary}
                >
                    <MenuItem>
                        <Typography>To Top of Library</Typography>
                    </MenuItem>
                </ContextMenuItem>
            ),
            (
                <ContextMenuItem
                    key={`library-bottom-move-item`}
                    onClick={bottomOfLibrary}
                >
                    <MenuItem>
                        <Typography>To Bottom of Library</Typography>
                    </MenuItem>
                </ContextMenuItem>
            )
        ];
    }

    const moveToItems = PLAYER_ZONES.filter(pz => player[pz] as string !== zone.id).map(pz => {
        const onClickMove = () => moveCardsFixCoords(zone.id, player[pz] as string, getCardsIds(), 100, 0, 0);

        return (
            <ContextMenuItem
                key={`${pz}-move-item`}
                onClick={onClickMove}
            >
                <MenuItem>
                    <Typography>{`To ${pz.charAt(0).toUpperCase() + pz.slice(1)}`}</Typography>
                </MenuItem>
            </ContextMenuItem>
        );
    });

    return (
        <Paper className={classes.main}>
            <MenuList>
                {libraryItems}
                {moveToItems}
            </MenuList>
        </Paper>
    );
};

export default CardContextMenu;
