import { BaseComponentProps } from '../../util/styling';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import React from 'react';

interface CardTextListProps extends BaseComponentProps {
    children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
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
