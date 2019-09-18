import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import CardsTextView from '../../containers/deck-editor/CardsTextView';
import CardsView from '../../containers/deck-editor/CardsView';
import CMCBar from '../../containers/deck-editor/CMCBar';
import Colors from '../../containers/deck-editor/Colors';
import Table from '../../containers/deck-editor/Table';
import Title from '../../containers/deck-editor/Title';
import Navbar from '../../containers/Navbar';
import LoadingSpinner from '../LoadingSpinner';

export const VIEWS = {
    table: 'Table',
    cards: 'Cards',
    links: 'Links'
};

export const CATEGORIES = {
    type: 'Card Type',
    cmc: 'Converted Mana Cost',
    color: 'Color',
    colorId: 'Color Identity',
    setName: 'Set Name'
};

interface DeckEditorProps {
    editing: boolean;
    loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'grid',
        gridTemplateRows: `auto 260px 1fr`,
        gridTemplateColumns: `auto auto auto`,
        gridTemplateAreas: "'menu menu menu' 'title colors cmc' 'viewEdit viewEdit viewEdit'",
        gridGap: '20px',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: `auto auto`,
            gridTemplateAreas: "'menu menu' 'title colors' 'viewEdit viewEdit'"
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateRows: `auto auto auto auto 1fr`,
            gridTemplateColumns: `auto`,
            gridTemplateAreas: "'menu' 'title' 'colors' 'cmc' 'typeAhead' 'viewEdit'"
        }
    },
    menu: {
        gridArea: 'menu',
        maxWidth: '0px'
    },
    header: {
        gridArea: 'header'
    },
    title: {
        gridArea: 'title',
        // allow for title truncation
        minWidth: '0px'
    },
    colors: {
        gridArea: 'colors'
    },
    cmc: {
        gridArea: 'cmc'
    },
    viewEdit: {
        gridArea: 'viewEdit'
    }
}));

const DeckEditor: React.SFC<DeckEditorProps> = (props) => {
    const { editing, loading } = props;
    const classes = useStyles({});
    const theme = useTheme<Theme>();
    const smBreak = useMediaQuery(theme.breakpoints.only('sm'));
    const [view, setView] = React.useState<keyof typeof VIEWS>('links');
    const [category, setCategory] = React.useState<keyof typeof CATEGORIES>('type');

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    let viewEdit;

    if (editing) {
        viewEdit = (
            <Table />
        );
    } else {
        switch (view) {
            case 'cards':
                viewEdit = (
                    <CardsView category={category} />
                );
                break;
            case 'links':
                viewEdit = (
                    <CardsTextView category={category} />
                );
                break;
            case 'table':
                viewEdit = (
                    <Table />
                );
                break;
            default:
                throw new Error(`Unknown view type ${view}`);
        }
    }

    return (
        <React.Fragment>
            <Navbar />
            <Container className={classes.container} maxWidth='xl'>
                <Box className={classes.title}>
                    <Title
                        view={view}
                        setView={setView}
                        category={category}
                        setCategory={setCategory}
                    />
                </Box>
                <Box className={classes.colors}>
                    <Colors />
                </Box>
                {smBreak ? null : (
                    <Box className={classes.cmc}>
                        <CMCBar />
                    </Box>
                )}
                <Box className={classes.viewEdit}>
                    {viewEdit}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default DeckEditor;
