import { BaseComponentProps } from '../../util/styling';
import { Box, Typography } from '@material-ui/core';
import { cardListToGroupedModelsSb, groupQuantitySum, rowQuantity } from '../../util/card';
import { CardsState } from '../../reducers/cardsReducer';
import { CATEGORIES } from './DeckEditor';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { makeStyles } from '@material-ui/core/styles';
import CardText from './CardText';
import CardTextList from './CardTextList';
import MasonryView from './MasonryView';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    group: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(.5),
        padding: theme.spacing(.5)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    groupName: {
        marginRight: theme.spacing(.5)
    }

}));

interface LinksViewProps extends BaseComponentProps {
    cardList: DeckEditorState['cards'];
    cardData: CardsState;
    category: keyof typeof CATEGORIES;
}

const CardsTextView: React.FC<LinksViewProps> = (props) => {
    const classes = useStyles({});
    const { cardList, cardData, category } = props;

    const groupedModels = cardListToGroupedModelsSb(cardList, cardData, category);

    const items = Object.keys(groupedModels).sort().map((groupName) => {
        const quantSum = groupQuantitySum(groupedModels[groupName].map((cardModel) => cardList[cardModel.id]), groupName);
        return (
            <Box
                key={groupName}
                className={classes.group}
            >
                <Box className={classes.header}>
                    <Typography className={classes.groupName} variant='subtitle1'>{groupName}</Typography>
                    <Typography variant='subtitle1'>{`(${quantSum})`}</Typography>
                </Box>
                <CardTextList>
                    {groupedModels[groupName].sort((a, b) => a.name().localeCompare(b.name())).map((cardModel) => {
                        const quantity = rowQuantity(cardList[cardModel.id], groupName);
                        return (
                            <CardText
                                key={cardModel.id}
                                card={cardModel}
                                quantity={quantity}
                            />);
                    })}
                </CardTextList>
            </Box>
        );
    });

    return (
        <MasonryView>
            {items}
        </MasonryView>
    );
};

export default CardsTextView;
