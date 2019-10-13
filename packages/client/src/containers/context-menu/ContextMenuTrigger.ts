import { connect } from 'react-redux';
import { connectMenu } from 'react-contextmenu';
import { openContextMenu } from '../../actions/clickActions';
import ContextMenuTrigger from '../../components/context-menu/ContextMenuTrigger';

export interface MappedContextMenuTriggerProps {
    openContextMenu: typeof openContextMenu;
}

const mapDispatchToProps = {
    openContextMenu
};

export default connectMenu('zone')(connect(null, mapDispatchToProps)(ContextMenuTrigger));
