import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { CardModel } from '@mtg-react-redux/models';
import React from 'react';
import WithHover from '../../hocs/WithHover';
import { BaseComponentProps } from '../../util/styling';
import Card from '../Card';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: 'max-content'
    },
    quant: {
        width: '2rem'
    }
}));

interface CardTextProps extends BaseComponentProps {
    card: CardModel;
    quantity: number;
    isHovered?: boolean;
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'transparent'
    }
}))(Tooltip);

const CardText: React.FC<CardTextProps> = (props) => {
    const classes = useStyles({});
    const { card, quantity } = props;

    return (
        <Link className={classes.root} href={card.scryfallUri} underline='none'>
            {<Typography className={classes.quant}>{quantity}</Typography>}
            <HtmlTooltip
                title={
                    <Card
                        card={card}
                        selected={false}
                        selecting={false}
                        cardHeight={32}
                        isHovered={false}
                    />
                }
                placement='right'
            >
                <Typography>{card.name()}</Typography>
            </HtmlTooltip>
        </Link>

    );
};

export default CardText;

export const HoverCardText = WithHover(CardText);
