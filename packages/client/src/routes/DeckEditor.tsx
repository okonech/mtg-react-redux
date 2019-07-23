import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    addCardByName as deckEditorAddCardByName,
    DeckEditorSetCardsByNameAction,
    deleteCards as deckEditorDeleteCards,
    setCardsByName as deckEditorSetCardsByName,
    setEditing as deckEditorSetEditing,
    setTitle as deckEditorSetTitle,
    updateCards as deckEditorUpdateCards
} from '../actions/deckEditorActions';
import ImagePreview from '../components/deck-editor/ImagePreview';
import Stats from '../components/deck-editor/Stats';
import Table from '../components/deck-editor/Table';
import Title from '../components/deck-editor/Title';
import TypeAhead from '../components/deck-editor/TypeAhead';
import Navbar from '../containers/Navbar';
import { AppState } from '../reducers';
import { Card, CardsState, singleCardSelector } from '../reducers/cardsReducer';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'grid',
        gridTemplateRows: `auto 260px 60px 1fr`,
        gridTemplateColumns: `auto auto 100px 250px`,
        gridTemplateAreas: "'menu menu menu menu' 'title stats stats image' 'typeAhead typeAhead denseSwitch image' 'table table table table'",
        gridGap: '20px',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateRows: `auto auto auto auto 1fr`,
            gridTemplateColumns: `auto`,
            gridTemplateAreas: "'menu' 'title' 'stats' 'typeAhead' 'table'"
        }
    },
    menu: {
        gridArea: 'menu'
    },
    header: {
        gridArea: 'header'
    },
    title: {
        gridArea: 'title'
    },
    stats: {
        gridArea: 'stats'
    },
    typeAhead: {
        gridArea: 'typeAhead'
    },
    denseSwitch: {
        gridArea: 'denseSwitch',
        display: 'flex'
    },
    image: {
        gridArea: 'image'
    },
    table: {
        gridArea: 'table'
    }
}));

interface DeckEditorProps {
    addCardByName: typeof deckEditorAddCardByName;
    setCardsByName: typeof deckEditorSetCardsByName;
    deleteCards: typeof deckEditorDeleteCards;
    updateCards: typeof deckEditorUpdateCards;
    setTitle: typeof deckEditorSetTitle;
    setEditing: typeof deckEditorSetEditing;
    cards: CardsState;
    deck: DeckEditorState;
}

const DeckEditor: React.SFC<DeckEditorProps> = (props) => {
    const { addCardByName, setCardsByName, setTitle, setEditing, deck, cards, updateCards } = props;
    const editing = deck.editing;
    const classes = useStyles({});
    const theme = useTheme<Theme>();
    const xsBreak = useMediaQuery(theme.breakpoints.down('xs'));
    const [dense, setDense] = React.useState(false);
    const [cardHover, setcardHover] = React.useState<Card>(null);

    function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
        setDense(event.target.checked);
    }

    function handleChangeCardHover(id: string) {
        setcardHover(singleCardSelector(cards, id));
    }

    const image = xsBreak ? null : (
        <Box className={classes.image}>
            <ImagePreview data={cardHover} />
        </Box>
    );

    const denseSwitch = xsBreak ? null : (
        <Box className={classes.denseSwitch}>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label='Dense'
            />
        </Box>
    );

    const typeAhead = !editing ? null : (
        <Box className={classes.typeAhead}>
            <TypeAhead addCardByName={addCardByName} />
        </Box>
    );

    return (
        <React.Fragment>
            <Navbar />
            <Container className={classes.container}>
                <Box className={classes.title}>
                    <Title
                        editing={editing}
                        setEditing={setEditing}
                        setCardsByName={setCardsByName}
                        setTitle={setTitle}
                        data={deck}
                    />
                </Box>
                <Box className={classes.stats}>
                    <Stats data={deck} />
                </Box>
                {typeAhead}
                {denseSwitch}
                {image}
                <Box className={classes.table}>
                    <Table
                        editing={editing}
                        dense={dense}
                        data={deck.cards}
                        select={handleChangeCardHover}
                        updateCards={updateCards}
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        cards: state.cards,
        deck: state.deckEditor
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addCardByName: (name: string) => dispatch(deckEditorAddCardByName(name)),
        setCardsByName: (cards: DeckEditorSetCardsByNameAction['payload']['cards']) => dispatch(deckEditorSetCardsByName(cards)),
        setTitle: (title: string) => dispatch(deckEditorSetTitle(title)),
        setEditing: (editing: boolean) => dispatch(deckEditorSetEditing(editing)),
        deleteCards: (ids: string[]) => dispatch(deckEditorDeleteCards(ids)),
        updateCards: (rows: DeckEditorRow[]) => dispatch(deckEditorUpdateCards(rows))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditor);
