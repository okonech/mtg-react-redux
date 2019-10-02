import { BaseComponentProps } from '../../util/styling';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import Paper from '@material-ui/core/Paper';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useTheme from '@material-ui/styles/useTheme';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    groupPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(.5),
        padding: theme.spacing(.5)
    }
}));

interface MasonryViewProps extends BaseComponentProps {
    children: ReactNode;
}

const MasonryView: React.FC<MasonryViewProps> = (props) => {
    const classes = useStyles({});
    const theme = useTheme<Theme>();
    const { children } = props;
    const [masonryWidth, setMasonryWidth] = useState(0);
    const [colWidth, setColWidth] = useState(0);
    const [needsReload, setNeedsReload] = useState(true);

    // update ref on window resize
    const measuredRef = useCallback((node) => {
        if (node !== null) {
            const masonry = node.firstElementChild as HTMLElement;
            setMasonryWidth(masonry.clientWidth);
            // masonry has data to display
            if (masonry && masonry.firstChild && masonry.firstChild.firstChild) {
                // get first column wrapped by masonry column
                setColWidth((masonry.firstChild.firstChild as HTMLElement).clientWidth + 8);
            }
            if (needsReload) {
                setNeedsReload(false);
            }
        }
    }, [needsReload]);

    // listen to window resize and force refresh
    useEffect(() => {
        const handleResize = () => setNeedsReload(true);
        // force reload after render
        setTimeout(() => setNeedsReload(true), 0);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Paper className={classes.root} ref={measuredRef}>
            <Masonry
                style={{ display: 'flex', padding: '8px' }}
                columnClassName='masonry-grid_column'
                breakpointCols={{
                    default: Math.min(Math.floor(masonryWidth / colWidth), Math.floor((window.innerWidth * .9) / colWidth)) || 1,
                    [theme.breakpoints.values.xs]: 1
                }}
            >
                {children}
            </Masonry>
        </Paper>
    );
};

export default MasonryView;
