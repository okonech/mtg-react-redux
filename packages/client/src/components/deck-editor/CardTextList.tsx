import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BaseComponentProps } from '../../util/styling';

interface CardTextListProps extends BaseComponentProps {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 215,
        width: 'max-content'
    }
}));

const CardTextList: React.FC<CardTextListProps> = (props) => {
    const classes = useStyles({});
    const { children } = props;

    return (
        <Box className={classes.root}>
            {children}
        </Box>
    );
};

export default CardTextList;
