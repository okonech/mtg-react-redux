import { Card as MuiCard, CardMedia, createStyles, Typography, withTheme, WithTheme } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { defaultMemoize } from 'reselect';
import { Card as CardType } from '../reducers/cardsReducer';
import { noSelect } from '../util/styling';

const styles = (theme: Theme) => {
  return createStyles({
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
};

interface CardProps extends WithStyles<typeof styles> {
  opacity?: number;
  card: CardType;
  cardHeight: number;
  hidden?: boolean;
  isHovered?: boolean;
}

interface SelectableProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

type AllProps = CardProps & SelectableProps & WithTheme;

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

  const { card, classes, isHovered, selecting } = props;
  const { name, url, id } = card;

  const displayName = (isHovered && !selecting) ? (
    <Typography className={classes.text}>
      {isHovered ? name : ''}
    </Typography>
  ) : <div />;

  return (
    <MuiCard
      id={id}
      style={cardStyle(props)}
      raised={isHovered}
      className={classes.main}
    >
      <CardMedia
        className={classes.media}
        image={url.small}
      >
        {displayName}
      </CardMedia>
    </MuiCard>
  );
};

export default withTheme((withStyles(styles)(Card)));
