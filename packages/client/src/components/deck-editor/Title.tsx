import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { memo } from 'react';
import { CardByName } from '../../actions/deckEditorActions';
import { MappedTitle } from '../../containers/deck-editor/Title';
import { BaseComponentProps } from '../../util/styling';
import ConfirmationDialog from '../ConfirmationDialog';
import { CATEGORIES, VIEWS } from './DeckEditor';
import ImportDialog from './ImportDialog';
import ViewDropdown from './ViewDropdown';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        minWidth: '230px',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    button: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1)
    },
    text: {
        marginTop: theme.spacing(3)
    }
}));

interface TitleProps extends BaseComponentProps, MappedTitle {
    view: keyof typeof VIEWS;
    setView: React.Dispatch<React.SetStateAction<keyof typeof VIEWS>>;
    category: keyof typeof CATEGORIES;
    setCategory: React.Dispatch<React.SetStateAction<keyof typeof CATEGORIES>>;
}

const Title: React.SFC<TitleProps> = (props) => {
    const { setCardsByName, data, cardData, setEditing, setTitle, view, setView, category, setCategory, deleteDeck, putDeck } = props;
    const { editing } = data;
    const classes = useStyles({});
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const [openImport, setOpenImport] = React.useState(false);

    function handleClickOpenImport() {
        setOpenImport(true);
    }

    function handleCloseImport() {
        setOpenImport(false);
    }

    function handleEditing() {
        setEditing(!editing);
    }

    function handleSave() {
        const { editing: noUse, ...deck } = data;
        console.log(deck);
        putDeck(deck);
        setEditing(!editing);

    }

    function handleDelete() {
        setDeleteDialogOpen(true);
    }

    function handleDeleteConfirm(del: boolean) {
        if (del) {
            deleteDeck(data.id);
        }
        setDeleteDialogOpen(false);
    }

    function handleSaveImport(cards: CardByName[]) {
        setOpenImport(false);
        setCardsByName(cards);
    }

    const handleTitleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Paper className={classes.root}>
            {editing ? (
                <React.Fragment>
                    <TextField
                        id='outlined-title'
                        label='Title'
                        autoFocus={true}
                        value={data.title}
                        onChange={handleTitleChange()}
                        margin='normal'
                        variant='outlined'
                    />
                    <Button variant='contained' color='primary' className={classes.button} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant='contained' color='secondary' className={classes.button} onClick={handleDelete}>
                        Delete
                    </Button>
                    <ConfirmationDialog
                        title='Delete Deck'
                        message={`Are you sure you want to delete ${data.title}? This action is not reversible!`}
                        open={deleteDialogOpen}
                        onClose={handleDeleteConfirm}
                    />
                    <Button variant='outlined' color='secondary' className={classes.button} onClick={handleClickOpenImport}>
                        Edit/Import Deck
                    </Button>
                    <ImportDialog
                        isOpen={openImport}
                        handleClose={handleCloseImport}
                        handleSave={handleSaveImport}
                        cardList={data.cards}
                        cardData={cardData}
                    />
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <Typography variant='h4' gutterBottom={true} align='center' noWrap={true} className={classes.text}>{data.title}</Typography>
                        <Button variant='contained' color='primary' className={classes.button} onClick={handleEditing}>
                            Edit
                        </Button>
                        <ViewDropdown
                            view={view}
                            setView={setView}
                            category={category}
                            setCategory={setCategory}
                        />
                    </React.Fragment>
                )
            }
        </Paper>
    );
};

export default memo(Title, (prev, next) => {
    return prev.data === next.data && prev.view === next.view && prev.category === next.category;
});
