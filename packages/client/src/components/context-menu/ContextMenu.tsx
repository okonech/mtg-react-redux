
import { CONTEXT_MENU } from './ContextMenuTrigger';
import { ContextMenu as ContextMenuComponent } from 'react-contextmenu';
import { MappedContextMenuProps } from '../../containers/context-menu/ContextMenu';
import { Player } from '../../reducers/playersReducer';
import CardContextMenu from '../../containers/context-menu/CardContextMenu';
import React, { ReactElement } from 'react';
import ZoneContextMenu from '../../containers/context-menu/ZoneContextMenu';

export const PLAYER_ZONES: Array<keyof Player> = ['hand', 'graveyard', 'exile', 'battlefield'];

const ContextMenu: React.FC<MappedContextMenuProps> = (props) => {
    const { trigger } = props;

    function renderMenu(): ReactElement {
        if (!props.trigger) {
            return <div />;
        }
        switch (props.trigger.type) {
            case 'card':
                return <CardContextMenu data={trigger} />;
            case 'zone':
                return <ZoneContextMenu data={trigger} />;
            default:
                return <div />;
        }
    }

    return (
        <ContextMenuComponent
            id={CONTEXT_MENU}
        >
            {renderMenu()}
        </ContextMenuComponent>
    );
};

export default ContextMenu;
