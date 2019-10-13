import * as parser from 'mtg-parser';
import { CardByName } from '../../actions/deckEditorActions';
import { cardsSelector, CardsState } from '../../reducers/cardsReducer';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { getSorting, stableSort } from '../../util/ordering';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

// TODO: make proper types for this elsewhere
type ParsedCardsList = Array<{ name: string; number: number }>;

interface ParsedCards {
    name: string;
    format: string;
    cards: ParsedCardsList;
    sideboard: ParsedCardsList;
}

interface ImportDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleSave: (cards: CardByName[]) => void;
    cardList: DeckEditorState['cards'];
    cardData: CardsState;
}

// multiline input for deck import

function formatCardsToText(cardList: ImportDialogProps['cardList'], cardData: ImportDialogProps['cardData']): string {
    const ordered = stableSort(cardsSelector(cardData, Object.keys(cardList)), getSorting('asc', 'name'));
    const main = ordered.filter((card) => cardList[card.id].quantity > 0).map((card) => `${cardList[card.id].quantity} ${card.name}`);
    const sideBoard = ordered.filter((card) => cardList[card.id].sideboard > 0).map((card) => `${cardList[card.id].sideboard} ${card.name}`);
    return `${main.join('\n')}${sideBoard.length > 0 ? '\nSideboard:\n' : ''}${sideBoard.join('\n')}`;
}

function formatTextToCards(text: string): CardByName[] {
    const parsed: ParsedCards = parser(text, 'mtgo');
    const cards: { [name: string]: { name: string; quantity: number; sideboard: number } } = {};

    parsed.cards.forEach((card) => {
        const { name, number: quant } = card;
        if (!name) {
            return;
        }
        if (!cards[name]) {
            cards[name] = { name, quantity: quant, sideboard: 0 };
        } else {
            cards[name].quantity += quant;
        }
    });
    parsed.sideboard.forEach((card) => {
        const { name, number: sb } = card;
        if (!name) {
            return;
        }
        if (!cards[name]) {
            cards[name] = { name, quantity: 0, sideboard: sb };
        } else {
            cards[name].sideboard += sb;
        }
    });

    return Object.values(cards);
}

const useStyles = makeStyles(() => ({
    textField: {
        minWidth: '25vw',
        maxWidth: '500px'
    }
}));

const ImportDialog: React.SFC<ImportDialogProps> = (props) => {
    const { isOpen, handleClose, handleSave, cardList, cardData } = props;
    const [textData, setTextData] = React.useState<string>();
    const classes = useStyles({});

    useEffect(() => {
        setTextData(formatCardsToText(cardList, cardData));
    }, [cardList, cardData]);

    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextData(event.target.value);
    }

    function wrapClose() {
        setTextData(formatCardsToText(cardList, cardData));
        handleClose();
    }

    function wrapSave() {
        handleSave(formatTextToCards(textData));
    }

    return (
        <Dialog
            open={isOpen}
            onClose={wrapClose}
            scroll={'paper'}
            aria-labelledby='scroll-dialog-title'
            maxWidth='xl'
        >
            <DialogTitle id='scroll-dialog-title'>Edit/Import Deck</DialogTitle>
            <DialogContent >
                <TextField
                    className={classes.textField}
                    id='outlined-multiline-flexible'
                    multiline={true}
                    autoFocus={true}
                    rows={25}
                    placeholder='1 Ad Nauseam'
                    margin='normal'
                    value={textData}
                    onChange={handleTextChange}
                    helperText='Accepts MWS, MTGO, MTGSalvation formats'
                    variant='outlined'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={wrapClose} color='secondary'>
                    Cancel
                </Button>
                <Button onClick={wrapSave} color='primary'>
                    Import
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportDialog;
