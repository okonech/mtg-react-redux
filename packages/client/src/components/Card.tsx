import { Card as MuiCard, CardMedia, createStyles, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import withTheme, { WithTheme } from '@material-ui/styles/withTheme';
import { CardModel } from '@mtg-react-redux/models';
import React from 'react';
import { defaultMemoize } from 'reselect';
import { getCardSizePx } from '../util/cardSize';
import { noSelect } from '../util/styling';

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

interface CardProps extends WithStyles<typeof styles> {
  opacity?: number;
  card: CardModel;
  cardHeight: number;
  hidden?: boolean;
  isHovered?: boolean;
  // optional string to decorate top of card. Will show even without hover
  topLabel?: string;
}

interface SelectableProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

type AllProps = CardProps & SelectableProps & WithTheme<any>;

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

const Card = (props: AllProps) => {

  const { card, classes, isHovered, selecting, topLabel } = props;

  const displayName = (topLabel || (isHovered && !selecting)) ? (
    <Typography className={classes.text}>
      {topLabel || (isHovered ? card.name() : '')}
    </Typography>
  ) : <div />;

  const imgUrl = getCardSizePx().height > 205 ? card.imageUrl('medium') : card.imageUrl('small');

  return (
    <MuiCard
      id={card.id}
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

export default withTheme((withStyles(styles)(Card)));
