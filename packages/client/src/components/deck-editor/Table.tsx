import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import React from 'react';
import { updateCards as deckEditorUpdateCards } from '../../actions/deckEditorActions';
import { DeckEditorRow, DeckEditorState } from '../../reducers/deckEditorReducer';
import { getSorting, stableSort } from '../../util/ordering';
import { BaseComponentProps } from '../../util/styling';

const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sideboard', numeric: true, disablePadding: false, label: 'Sideboard' },
    { id: 'owned', numeric: true, disablePadding: false, label: 'Owned' }
];

const xsRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sideboard', numeric: true, disablePadding: false, label: 'Sideboard' }
];

interface TableHeadProps {
    order: 'asc' | 'desc';
    orderBy: keyof DeckEditorRow;
    onRequestSort: (evt, prop) => void;
}

const EnhancedTableHead: React.FC<TableHeadProps> = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const theme = useTheme<Theme>();
    const xsBreak = useMediaQuery(theme.breakpoints.down('xs'));

    const tableRows = xsBreak ? xsRows : headRows;

    return (
        <TableHead>
            <TableRow>
                {tableRows.map((row) => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

interface EnhancedTableRowProps {
    xsRow: boolean;
    editing: boolean;
    update: typeof deckEditorUpdateCards;
    data: DeckEditorRow;
}

const EnhancedTableRow: React.FC<EnhancedTableRowProps> = (props) => {
    const { xsRow, editing, data, update } = props;

    const handleRowChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id.split(':::');
        const value = Number.parseInt(event.target.value, 10);
        if (Number.isInteger(value) && value >= 0) {
            update([{ ...data, [id[1]]: event.target.value }]);
        }
    };

    if (editing) {
        return (
            <React.Fragment>
                <TableCell component='th' scope='row'>
                    {data.name}
                </TableCell>
                {xsRow ? null :
                    <TableCell align='left'>
                        {data.type}
                    </TableCell>}
                <TableCell align='right'>
                    <TextField
                        id={`${data.id}:::quantity`}
                        value={data.quantity}
                        onChange={handleRowChange()}
                        type='number'
                        margin='dense'
                        variant='outlined'
                    />
                </TableCell>
                <TableCell align='right'>
                    <TextField
                        id={`${data.id}:::sideboard`}
                        value={data.sideboard}
                        onChange={handleRowChange()}
                        type='number'
                        margin='dense'
                        variant='outlined'
                    />
                </TableCell>
                {xsRow ? null :
                    <TableCell align='right'>
                        <TextField
                            id={`${data.id}:::owned`}
                            value={data.owned}
                            onChange={handleRowChange()}
                            type='number'
                            margin='dense'
                            variant='outlined'
                        />
                    </TableCell>}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <TableCell component='th' scope='row'>{data.name}</TableCell>
            {xsRow ? null : <TableCell align='left'>{data.type}</TableCell>}
            <TableCell align='right'>{data.quantity}</TableCell>
            <TableCell align='right'>{data.sideboard}</TableCell>
            {xsRow ? null : <TableCell align='right'>{data.owned}</TableCell>}
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 300
    },
    tableWrapper: {
        overflowX: 'auto'
    }
}));

interface TableProps extends BaseComponentProps {
    dense: boolean;
    data: DeckEditorState['cards'];
    select: (id: string) => void;
    editing: boolean;
    updateCards: typeof deckEditorUpdateCards;
}

const EnhancedTable: React.FC<TableProps> = (props) => {
    const { dense, data, select, editing, updateCards } = props;
    const classes = useStyles({});
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DeckEditorRow>('name');
    const theme = useTheme<Theme>();
    const xsBreak = useMediaQuery(theme.breakpoints.down('xs'));

    function handleRequestSort(event, property: keyof DeckEditorRow) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function rowSelect(id) {
        return () => select(id);
    }

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size={'small'}
                        padding={dense ? 'checkbox' : 'default'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(Object.values(data), getSorting(order, orderBy))
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover={true}
                                            tabIndex={-1}
                                            key={row.name}
                                            onClick={rowSelect(row.id)}
                                        >
                                            <EnhancedTableRow
                                                xsRow={xsBreak}
                                                editing={editing}
                                                update={updateCards}
                                                data={row}
                                            />
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </Box>
    );
};

export default EnhancedTable;
