import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {
    DeckEditorSetCardsByNameAction,
    setCardsByName as deckEditorSetCardsByName,
    setTitle as deckEditorSetTitle
} from '../../actions/deckEditorActions';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { CATEGORIES, VIEWS } from '../../routes/DeckEditor';
import { BaseComponentProps } from '../../util/styling';
import ImportDialog from './ImportDialog';
import ViewDropdown from './ViewDropdown';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
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

interface TitleProps extends BaseComponentProps {
    setCardsByName: typeof deckEditorSetCardsByName;
    setTitle: typeof deckEditorSetTitle;
    data: DeckEditorState;
    editing: boolean;
    setEditing: (editing: boolean) => void;
    view: keyof typeof VIEWS;
    setView: React.Dispatch<React.SetStateAction<keyof typeof VIEWS>>;
    category: keyof typeof CATEGORIES;
    setCategory: React.Dispatch<React.SetStateAction<keyof typeof CATEGORIES>>;
}

const Title: React.SFC<TitleProps> = (props) => {
    const { setCardsByName, data, editing, setEditing, setTitle, view, setView, category, setCategory } = props;
    const classes = useStyles({});

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

    function handleSaveImport(cards: DeckEditorSetCardsByNameAction['payload']['cards']) {
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
                    <Button variant='contained' color='primary' className={classes.button} onClick={handleEditing}>
                        Save
                    </Button>
                    <Button variant='contained' color='secondary' className={classes.button}>
                        Delete
                    </Button>
                    <Button variant='outlined' color='secondary' className={classes.button} onClick={handleClickOpenImport}>
                        Import Deck
                    </Button>
                    <ImportDialog
                        isOpen={openImport}
                        handleClose={handleCloseImport}
                        handleSave={handleSaveImport}
                        data={data.cards}
                    />
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <Typography variant='h4' gutterBottom={true} align='center' className={classes.text}>{data.title}</Typography>
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

export default Title;
