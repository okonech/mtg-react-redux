import { Card as MuiCard, CardMedia, createStyles, Typography, withTheme, WithTheme } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import { defaultMemoize } from 'reselect';
import withHover from '../hocs/WithHover';
import { Card as CardType } from '../reducers/cardsReducer';
import { noSelect } from '../util/styling';

const styles = (theme: Theme) => {
  return createStyles({
    main: {
      borderRadius: '5%',
      boxSizing: 'border-box',
      flexShrink: 0
    },
    media: {
      height: '100%'
    },
    text: {
      padding: 5,
      wordWrap: 'break-word'
    }
  });
};

interface CardProps extends WithStyles<typeof styles> {
  opacity: number;
  card: CardType;
  cardHeight: number;

}

interface SelectableProps {
  selectableRef?: string;
  selected?: boolean;
  selecting?: boolean;
}

interface HoverProps {
  isHovered?: boolean;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
}

type AllProps = CardProps & SelectableProps & HoverProps & WithTheme;

const cardStyle = defaultMemoize((props: AllProps): React.CSSProperties => {
  const { opacity, selected, selecting, cardHeight, theme, isHovered } = props;
  const { secondary, primary } = theme.palette;
  return noSelect({
    opacity,
    // primary selecting, secondary selected,  black default
    border: selected ? `1px solid ${secondary.main}` : selecting ? `1px solid ${primary.main}` : `1px solid black`,
    // todo: convert to memoized function that takes props and returns style obj
    height: `${cardHeight}vh`,
    width: `${cardHeight * 0.716}vh`,
    transform: (isHovered && !selecting) ? 'scale(1.025)' : 'none'
  });
});

const Card = (props: AllProps) => {

  const { card, classes, isHovered, onMouseEnter, onMouseLeave } = props;
  const { name, url, id } = card;
  return (
    <MuiCard
      id={id}
      style={cardStyle(props)}
      raised={isHovered}
      className={classes.main}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardMedia
        className={classes.media}
        image={url.small}
      >
        <Typography className={classes.text}>
          {name}
        </Typography>
      </CardMedia>

    </MuiCard>
  );
};

export default withTheme()(withStyles(styles)(withHover(Card)));
