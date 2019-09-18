import { CardModel } from '@mtg-react-redux/models';
import { CardProps } from './Card';
import { createStyles } from '@material-ui/core/styles';
import { defaultMemoize } from 'reselect';
import { getCardSizePx } from '../util/cardSize';
import { noSelect } from '../util/styling';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import MuiCard from '@material-ui/core/Card';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withTheme, { WithTheme } from '@material-ui/styles/withTheme';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            borderRadius: '5%',
            boxSizing: 'border-box',
            flexShrink: 0
            // '&:hover': {
            //   transform: 'scale(1.04)'
            // }
        },
        media: {
            height: '100%'
        },
        text: {
            padding: 5,
            wordWrap: 'break-word',
            display: 'inline',
            fontSize: '.8rem',
            backgroundColor: theme.palette.getContrastText(theme.palette.text.primary)
        }
    });

interface CardDisplayProps extends Omit<CardProps, 'card'>, WithStyles<typeof styles> {
    card: CardModel;
    id: string;
    tapped: boolean;
    flipped: boolean;
}

interface SelectableProps {
    selectableRef?: string;
    selected?: boolean;
    selecting?: boolean;
}

type AllProps = CardDisplayProps & SelectableProps & WithTheme<any>;

const cardStyle = defaultMemoize((props: AllProps): React.CSSProperties => {
    const { opacity, selected, selecting, cardHeight, theme, isHovered, hidden } = props;
    const { secondary, primary } = theme.palette;
    return noSelect({
        opacity: opacity || 1,
        // primary selecting, secondary selected,  black default
        border: selected ? `1px solid ${secondary.main}` : selecting ? `1px solid ${primary.main}` : `1px solid black`,
        height: `${cardHeight}vh`,
        width: `${cardHeight * 0.716}vh`,
        display: hidden ? 'none' : 'block',
        transform: (isHovered && !selecting) ? 'scale(1.025)' : 'none'
    });
});

const CardDisplay = (props: AllProps) => {

    const { card, id, classes, isHovered, selecting, topLabel } = props;

    const displayName = (topLabel || (isHovered && !selecting)) ? (
        <Typography className={classes.text}>
            {topLabel || (isHovered ? card.name() : '')}
        </Typography>
    ) : '';

    const imgUrl = getCardSizePx().height > 205 ? card.imageUrl('medium') : card.imageUrl('small');

    return (
        <MuiCard
            id={id}
            style={cardStyle(props)}
            raised={isHovered}
            className={classes.main}
        >
            <CardMedia
                className={classes.media}
                image={imgUrl}
            >
                {displayName}
            </CardMedia>
        </MuiCard>
    );
};

export default withTheme((withStyles(styles)(CardDisplay)));
