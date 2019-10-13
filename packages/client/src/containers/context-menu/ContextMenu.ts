import { connectMenu } from 'react-contextmenu';
import { CONTEXT_MENU, Data } from '../../components/context-menu/ContextMenuTrigger';
import ContextMenu from '../../components/context-menu/ContextMenu';

export interface MappedContextMenuProps {
    trigger: Data;
}

export default connectMenu(CONTEXT_MENU)(ContextMenu);
