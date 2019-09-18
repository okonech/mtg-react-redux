import { AppState } from '../reducers';
import { connect } from 'react-redux';
import { getDeckLoadCardsAsync } from '../actions/deckEditorActions';
import { RouteComponentProps } from 'react-router';
import DeckEditor from '../containers/deck-editor/DeckEditor';
import React from 'react';

interface DeckEditorRouteProps extends RouteComponentProps {
    id: string;
    getDeck: typeof getDeckLoadCardsAsync.request;
}

const DeckEditorRoute: React.FC<DeckEditorRouteProps> = (props) => {
    const { id, match, getDeck } = props;
    if (id !== (match.params as any).id) {
        getDeck((match.params as any).id);
    }
    return (
        <DeckEditor />
    );
};

const mapStateToProps = (state: AppState) =>
    ({
        id: state.deckEditor.id
    });

const mapDispatchToProps = {
    getDeck: getDeckLoadCardsAsync.request
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditorRoute);
