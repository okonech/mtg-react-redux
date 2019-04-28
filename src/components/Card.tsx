import { Card as MuiCard, CardMedia, createStyles, Typography, withTheme } from '@material-ui/core';
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

type AllProps = CardProps & SelectableProps;

const cardStyle = defaultMemoize((props: any): React.CSSProperties => {
  const { opacity, selected, selecting, cardHeight, theme } = props;
  const { secondary, primary } = theme.palette;
  return noSelect({
    opacity,
    // purble selecting, red selected, black default
    border: selected ? `1px solid ${secondary.main}` : selecting ? `1px solid ${primary.main}` : `1px solid black`,
    // todo: convert to memoized function that takes props and returns style obj
    height: `${cardHeight}vh`,
    width: `${cardHeight * 0.716}vh`
  });
});

const Card = (props: AllProps) => {

  const { card, classes } = props;
  const { name, url, id } = card;
  return (
    <MuiCard id={id} style={cardStyle(props)} raised={true} className={classes.main}>
      <CardMedia
        className={classes.media}
        image={url}
      >
        <Typography className={classes.text}>
          {name}
        </Typography>
      </CardMedia>

    </MuiCard>
  );
};

export default withTheme()(withStyles(styles)(Card));
