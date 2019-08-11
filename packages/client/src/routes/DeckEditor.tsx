import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getDeckAsync } from '../actions/deckEditorActions';
import DeckEditor from '../containers/deck-editor/DeckEditor';
import { AppState } from '../reducers';

interface DeckEditorRouteProps extends RouteComponentProps {
    id: string;
    getDeck: typeof getDeckAsync.request;
}

const DeckEditorRoute: React.FC<DeckEditorRouteProps> = (props) => {
    const { id, match, getDeck } = props;
    if (id !== (match.params as any).id) {
        console.log('dispatch');
        getDeck((match.params as any).id);
    }
    return (
        <DeckEditor />
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        id: state.deckEditor.id
    };
};

const mapDispatchToProps = {
    getDeck: getDeckAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditorRoute);
