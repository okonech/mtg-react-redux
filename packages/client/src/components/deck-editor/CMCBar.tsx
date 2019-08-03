import { Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/styles';
import { CardModelImpl } from '@mtg-react-redux/models/dist/Card';
import React, { memo, useState } from 'react';
import {
    Hint,
    VerticalBarSeries,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';
import { CardsState } from '../../reducers/cardsReducer';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { getModelsForCards, groupCardsByCategory, groupQuantitySum } from '../../util/card';
import { BaseComponentProps, MTG_COLORS } from '../../util/styling';

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
    hint: {
        pointerEvents: 'none',
        background: '#3a3a48',
        boxShadow: '0 2px 4px rgba(0,0,0,.5)',
        color: '#fff',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        padLeft: '2px',
        padRight: '2px'
    },
    barGraph: {
        position: 'relative'
    }
}));

interface BarGraphData {
    x: string;
    y: number;
    stroke?: string;
    dataColor: string;
}

function barGraphLabelOut(val: BarGraphData) {
    return [{ title: `CMC ${val.x}`, value: ` ${val.y} ${val.dataColor} Card${val.y > 1 ? 's' : ''}` }];
}

const CmcBarGraph: React.SFC<StatsProps> = (props) => {
    const classes = useStyles({});
    const theme = useTheme<Theme>();
    const [val, setVal] = useState<BarGraphData>(null);
    const { cardList, cardData } = props;

    const models = getModelsForCards(cardList, cardData, 'main');
    const { Land, ...nonland } = groupCardsByCategory(models, 'type');
    const nonLandModels = Object.keys(nonland).reduce((acc, curr) => {
        acc.splice(acc.length, 0, ...nonland[curr]);
        return acc;
    }, new Array<CardModelImpl>());
    const colorModelsMap = groupCardsByCategory(nonLandModels, 'color');
    const cmcCounts = Object.keys(groupCardsByCategory(nonLandModels, 'cmc'));

    const series = Object.keys(colorModelsMap).reduce((acc, color) => {

        const cmcModelsMap = groupCardsByCategory(colorModelsMap[color], 'cmc');
        const cmcCount = Object.keys(cmcModelsMap).reduce((counts, cmc) => {
            counts[cmc] = groupQuantitySum(cmcModelsMap[cmc].map((cardModel) => cardList[cardModel.id]), cmc);
            return counts;
        }, {});

        const data: BarGraphData[] = cmcCounts.map((cmc) => {
            if ((val !== null) && (val.x === cmc) && (val.dataColor === color)) {
                return {
                    x: cmc,
                    y: cmcCount[cmc] || 0,
                    dataColor: color,
                    color: theme.palette.secondary.contrastText
                };
            }
            return {
                x: cmc,
                y: cmcCount[cmc] || 0,
                dataColor: color,
                color: MTG_COLORS[color]
            };
        });

        acc.push(
            <VerticalBarSeries
                key={color}
                cluster='cmc'
                colorType='literal'
                data={data}
                // tslint:disable-next-line: jsx-no-lambda
                onValueMouseOver={(v) => setVal(v)}
                // tslint:disable-next-line: jsx-no-lambda
                onSeriesMouseOut={() => setVal(null)}
            />
        );
        return acc;
    }, new Array<VerticalBarSeries>());

    const axesStyles = {
        text: { fill: theme.palette.secondary.contrastText }
    };

    return (
        <XYPlot
            className={classes.barGraph}
            xType='ordinal'
            stackBy='y'
            width={Math.min(cmcCounts.length * 40 + 55, 300)}
            height={210}
        >
            <XAxis
                style={axesStyles}
            />
            <YAxis
                style={axesStyles}
            />
            {series}
            {val !== null && <Hint className={classes.hint} value={val} format={barGraphLabelOut} />}
        </XYPlot>

    );
};

const CMCBar: React.FC<StatsProps> = (props) => {
    const classes = useStyles({});
    const { cardList, cardData } = props;

    return (
        <Paper className={classes.root}>
            <Typography variant={'h6'} className={classes.title}>Converted Cost</Typography>
            <CmcBarGraph
                cardList={cardList}
                cardData={cardData}
            />
        </Paper>
    );
};

export default memo(CMCBar, (prev, next) => {
    return prev.cardList === next.cardList && prev.cardData === next.cardData;
});
