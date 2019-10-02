
import { BaseComponentProps } from '../../util/styling';
import { Card } from '../../reducers/cardsReducer';
import { cardModelsMap } from '@mtg-react-redux/models';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        'height': '100%',
        'width': '100%',
        'padding': theme.spacing(2),
        'display': 'flex',
        'overflow': 'auto',
        '& img': {
            height: '100%',
            borderRadius: '5% / 3.75%'
        }
    }
}));

interface ImagePreviewProps extends BaseComponentProps {
    data: Card;
}

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
    const classes = useStyles({});
    const { data } = props;
    if (data) {
        const cardModel = cardModelsMap.getModel(data);
        return (
            <Paper className={classes.root}>
                <img src={cardModel.imageUrl('medium')} alt={cardModel.name()} />
            </Paper>
        );
    }

    return (
        <Paper className={classes.root}>
            <Typography>Image Preview</Typography>
        </Paper>
    );
};

export default ImagePreview;
