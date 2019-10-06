import { MappedContextMenuTriggerProps } from '../../containers/context-menu/ContextMenuTrigger';
import { ContextMenuTrigger as Trigger } from 'react-contextmenu';
import React from 'react';

export const CONTEXT_MENU = 'CONTEXT_MENU_EVENT';

export interface PlayerProps {
    type: 'player';
    player: string;
}

export interface ZoneProps {
    type: 'zone';
    player: string;
    zone: string;
}

export interface CardProps {
    type: 'card';
    player: string;
    zone: string;
    card: string;
}

export interface Data extends React.HTMLAttributes<any> {
    type: PlayerProps['type'] | ZoneProps['type'] | CardProps['type'];
    player?: string;
    zone?: string;
    card?: string;
}

type AllProps = MappedContextMenuTriggerProps & (PlayerProps | ZoneProps | CardProps);

function collect(props: AllProps) {
    const { type, openContextMenu } = props;
    const attributes: Data = { type };

    openContextMenu();

    // directly reference props.type to prevent type widening so each case sees the right prop type
    switch (props.type) {
        case 'player':
            attributes.player = props.player;
            break;
        case 'zone':
            attributes.player = props.player;
            attributes.zone = props.zone;
            break;
        case 'card':
            attributes.player = props.player;
            attributes.zone = props.zone;
            attributes.card = props.card;
            break;
        default:
            throw new Error(`Unknown context menu type: ${type}`);
    }

    return attributes;
}

const ContextMenuTrigger: React.SFC<AllProps> = (props) => (
    <Trigger
        {...props}
        id={CONTEXT_MENU}
        collect={collect}
        holdToDisplay={-1}
    >
        {props.children}
    </Trigger>
);

export default ContextMenuTrigger;
