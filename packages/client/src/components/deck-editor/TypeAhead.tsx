import { addCardByNameAsync } from '../../actions/deckEditorActions';
import { Cards } from 'scryfall-sdk';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import parse from 'autosuggest-highlight/parse';
import React from 'react';
import TextField from '@material-ui/core/TextField';

function renderInputComponent(inputProps: any) {
    const { classes, inputRef = () => ({}), ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth={true}
            InputProps={{
                inputRef: (node) => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion: string, { query, isHighlighted }: Autosuggest.RenderSuggestionParams) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem key={suggestion} selected={isHighlighted} component='div'>
            <div>
                {parts.map((part, idx) => (
                    <span key={`${part.text}-${idx}`} style={{ fontWeight: part.highlight ? 800 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}

async function getSuggestions(value: string) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength < 2) {
        return [];
    }

    const found = await Cards.autoCompleteName(value);
    return found.slice(0, 5);
}

function getSuggestionValue(suggestion: string) {
    return suggestion;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        container: {
            position: 'relative'
        },
        suggestionsContainerOpen: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0
        },
        suggestion: {
            display: 'block'
        },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none'
        },
        divider: {
            height: theme.spacing(2)
        }
    })
);

interface TypeAheadProps {
    addCardByName: typeof addCardByNameAsync.request;
}

const TypeAhead: React.SFC<TypeAheadProps> = (props) => {
    const { addCardByName } = props;
    const classes = useStyles({});
    const [state, setState] = React.useState('');
    const [stateSuggestions, setSuggestions] = React.useState<string[]>([]);

    const handleSuggestionsFetchRequested = async ({ value }: any) => {
        const res = await getSuggestions(value);
        setSuggestions(res);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = () => (
        event: React.ChangeEvent<{}>,
        { newValue }: Autosuggest.ChangeEvent
    ) => {
        setState(newValue);
    };

    const handleSubmit = () => (event: KeyboardEvent) => {
        if (event.key === 'Enter' && stateSuggestions.length === 0) {
            addCardByName({ name: state, sideboard: 0, quantity: 1 });
            setState('');
        }
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion
    };

    const suggestionsContainer = (options) => (
        <Paper {...options.containerProps} square={true}>
            {options.children}
        </Paper>
    );

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'card-typeahead',
                    label: 'Add Card',
                    placeholder: 'Enter a card name',
                    value: state,
                    onChange: handleChange(),
                    onKeyPress: handleSubmit()
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                }}
                renderSuggestionsContainer={suggestionsContainer}
            />
        </div>
    );
};

export default TypeAhead;
