import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { DeckEditorState } from '../../reducers/deckEditorReducer';
import { BaseComponentProps } from '../../util/styling';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    }
}));

interface StatsProps extends BaseComponentProps {
    data: DeckEditorState;
}

const Stats: React.FC<StatsProps> = (props) => {
    const classes = useStyles({});

    return (
        <Paper className={classes.root}>
            <Typography>Stats</Typography>
        </Paper>
    );
};

export default Stats;
