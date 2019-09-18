import { BaseComponentProps, MTG_COLORS } from '../../util/styling';
import { CardModel } from '@mtg-react-redux/models';
import { CardsState } from '../../reducers/cardsReducer';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { getModelsForCards, groupCardsByCategory, groupQuantitySum } from '../../util/card';
import { Hint, RadialChart } from 'react-vis';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';

interface StatsProps extends BaseComponentProps {
    cardList: DeckEditorState['cards'];
    cardData: CardsState;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center'
    },
    radial: {
        position: 'relative'
    },
    slice: {
        '&:hover': {
            stroke: `${theme.palette.secondary.contrastText} !important`,
            strokeWidth: '2px !important'
        }
    },
    hint: {
        pointerEvents: 'none',
        background: '#3a3a48',
        boxShadow: '0 2px 4px rgba(0,0,0,.5)',
        color: '#fff',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        padLeft: '2px',
        padRight: '2px'
    }
}));

interface RadialData {
    theta: string;
    className?: string;
    label: string;
    color: string;
}

function radialLabelOut(val: RadialData) {
    return [{ title: val.label, value: val.theta }];
}

const ColorRadial: React.SFC<StatsProps> = (props) => {
    const classes = useStyles({});
    const [val, setVal] = useState<RadialData>(null);
    const { cardList, cardData } = props;

    const models = getModelsForCards(cardList, cardData, 'main');
    const { Land = [], ...nonland } = groupCardsByCategory(models, 'type');
    const nonLandModels = Object.keys(nonland).reduce((acc, curr) => {
        acc.splice(acc.length, 0, ...nonland[curr]);
        return acc;
    }, new Array<CardModel>());
    const colorModels = { ...groupCardsByCategory(nonLandModels, 'color'), Land };
    const colorsCounts = Object.keys(colorModels).reduce((acc, curr) => {
        acc[curr] = groupQuantitySum(colorModels[curr].map((cardModel) => cardList[cardModel.id]), curr);
        return acc;
    }, {});

    const data: RadialData[] = Object.keys(colorsCounts).filter((groupName) => colorsCounts[groupName] > 0).map((groupName) => (
        {
            theta: colorsCounts[groupName],
            className: classes.slice,
            label: groupName,
            color: MTG_COLORS[groupName]
        }));

    return (
        <RadialChart
            className={classes.radial}
            colorType={'literal'}
            innerRadius={60}
            radius={100}
            // tslint:disable-next-line: jsx-no-lambda
            getAngle={(d) => d.theta}
            data={data}
            // tslint:disable-next-line: jsx-no-lambda
            onValueMouseOver={(v) => setVal(v)}
            // tslint:disable-next-line: jsx-no-lambda
            onSeriesMouseOut={() => setVal(null)}
            width={210}
            height={210}
            padAngle={0.02}
        >
            {val !== null && <Hint className={classes.hint} value={val} format={radialLabelOut} />}
        </RadialChart>
    );
};

const Colors: React.FC<StatsProps> = (props) => {
    const classes = useStyles({});
    const { cardList, cardData } = props;

    return (
        <Paper className={classes.root}>
            <Typography variant={'h6'} className={classes.title}>Colors</Typography>
            <ColorRadial
                cardList={cardList}
                cardData={cardData}
            />
        </Paper>
    );
};

export default memo(Colors, (prev, next) =>
    prev.cardList === next.cardList && prev.cardData === next.cardData
);
