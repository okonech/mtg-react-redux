import { Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/styles/useTheme';
import { CardModel } from '@mtg-react-redux/models';
import React, { useCallback, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { cardsSelector, CardsState } from '../../reducers/cardsReducer';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { CATEGORIES } from '../../routes/DeckEditor';
import { groupCardsByType } from '../../util/card';
import { getCardSizePx, getCardSizeVh, setCardHeight } from '../../util/cardSize';
import { BaseComponentProps } from '../../util/styling';
import Card from '../Card';
import CardList from '../CardList';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    groupPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(.5),
        padding: theme.spacing(.5)
    }
}));

interface StatsProps extends BaseComponentProps {
    cardList: DeckEditorState['cards'];
    cardData: CardsState;
    category: keyof typeof CATEGORIES;
}

const CardsView: React.FC<StatsProps> = (props) => {
    const classes = useStyles({});
    const theme = useTheme<Theme>();
    const { cardList, cardData, category } = props;
    const [width, setWidth] = useState(0);
    const [needsReload, setNeedsReload] = useState(true);

    // update ref on window resize
    const measuredRef = useCallback((node) => {
        if (node !== null) {
            const rect = node.firstElementChild.getBoundingClientRect();
            setWidth(rect.width);
            if (needsReload) {
                setNeedsReload(false);
            }
        }
    }, [needsReload]);

    // listen to window resize and force refresh
    useEffect(() => {
        const handleResize = () => setNeedsReload(true);
        // force reload after render
        setTimeout(() => setNeedsReload(true), 0);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    setCardHeight(25);
    const cardWidthPx = getCardSizePx().width;
    const cardHeightVh = getCardSizeVh().height;
    const breakpoints = theme.breakpoints.values;
    const models = cardsSelector(cardData, Object.keys(cardList)).map((card) => new CardModel(card));
    const groupedModels = groupCardsByType(models, category);

    const items = Object.keys(groupedModels).map((groupName) => {
        return (
            <Paper
                key={groupName}
                className={classes.groupPaper}
                elevation={3}
            >
                <Typography variant='subtitle1' align='center' >{groupName}</Typography>
                <CardList
                    direction='column'
                >
                    {groupedModels[groupName].map((cardModel) => (
                        <Card
                            key={cardModel.id()}
                            card={cardModel.dehydrate()}
                            cardHeight={cardHeightVh}
                        />
                    ))}
                </CardList>
            </Paper>
        );
    });

    return (
        <Paper className={classes.root} ref={measuredRef}>
            <Masonry
                style={{ display: 'flex', padding: '8px' }}
                className='my-masonry-grid'
                columnClassName='my-masonry-grid_column'
                breakpointCols={{
                    default: Math.floor(width / (cardWidthPx + 20)) || 1,
                    [breakpoints.xs]: 1
                }}
            >
                {items}
            </Masonry>
        </Paper>
    );
};

export default CardsView;
