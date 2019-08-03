import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as parser from 'mtg-parser';
import React, { useEffect } from 'react';
import { DeckEditorSetCardsByNameAction } from '../../actions/deckEditorActions';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { getSorting, stableSort } from '../../util/ordering';

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
    handleSave: (cards: DeckEditorSetCardsByNameAction['payload']['cards']) => void;
    data: DeckEditorState['cards'];
}

// multiline input for deck import

function formatCardsToText(cards: ImportDialogProps['data']): string {
    const ordered = stableSort(Object.values(cards), getSorting('asc', 'name'));
    const main = ordered.filter((card) => card.quantity > 0).map((card) => `${card.quantity} ${card.name}`);
    const sideBoard = ordered.filter((card) => card.sideboard > 0).map((card) => `${card.sideboard} ${card.name}`);
    return `${main.join('\n')}${sideBoard.length > 0 ? '\nSideboard:\n' : ''}${sideBoard.join('\n')}`;
}

function formatTextToCards(text: string): DeckEditorSetCardsByNameAction['payload']['cards'] {
    const parsed: ParsedCards = parser(text, 'mtgo');
    const cards: { [name: string]: { name: string, quantity: number, sideboard: number } } = {};

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

const useStyles = makeStyles((theme) => ({
    textField: {
        minWidth: '25vw',
        maxWidth: '500px'
    }
}));

const ImportDialog: React.SFC<ImportDialogProps> = (props) => {
    const { isOpen, handleClose, handleSave, data } = props;
    const [textData, setTextData] = React.useState<string>();
    const classes = useStyles({});

    useEffect(() => {
        setTextData(formatCardsToText(data));
    }, [data]);

    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextData(event.target.value);
    }

    function wrapClose() {
        setTextData(formatCardsToText(data));
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
            <DialogTitle id='scroll-dialog-title'>Import Deck</DialogTitle>
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
