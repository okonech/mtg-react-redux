import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/styles/useTheme';
import { CardModel } from '@mtg-react-redux/models';
import React, { memo } from 'react';
import { MappedTable } from '../../containers/deck-editor/Table';
import { cardsSelector, CardsState, singleCardSelector } from '../../reducers/cardsReducer';
import { DeckEditorRow } from '../../reducers/deckEditorReducer';
import { getSorting, stableSort } from '../../util/ordering';
import { BaseComponentProps } from '../../util/styling';
import TypeAhead from './TypeAhead';

const useStyles = makeStyles((theme) => ({
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
    },
    toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    spacer: {
        flex: '1 1'
    },
    typeAhead: {
        paddingBottom: theme.spacing(2),
        width: '50%'
    }
}));

const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'set', numeric: false, disablePadding: false, label: 'Set' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sideboard', numeric: true, disablePadding: false, label: 'Sideboard' },
    { id: 'owned', numeric: true, disablePadding: false, label: 'Owned' }
];

const xsRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'set', numeric: false, disablePadding: false, label: 'Set' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sideboard', numeric: true, disablePadding: false, label: 'Sideboard' }
];

interface TableRow extends DeckEditorRow {
    name: string;
}

interface TableHeadProps {
    order: 'asc' | 'desc';
    orderBy: keyof TableRow;
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

const MemoizedHeader = memo(EnhancedTableHead, (prev, next) => {
    return prev.order === next.order && prev.orderBy === next.orderBy;
});

interface EnhancedTableToolbarProps {
    dense: boolean;
    setDense: React.Dispatch<React.SetStateAction<boolean>>;
    editing: boolean;
    addCardByName: TableProps['addCardByName'];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useStyles({});
    const { dense, setDense, editing, addCardByName } = props;

    function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
        setDense(event.target.checked);
    }

    const typeAhead = !editing ? null : <Box className={classes.typeAhead} ><TypeAhead addCardByName={addCardByName} /></Box>;

    return (
        <Toolbar
            className={classes.toolbar}
        >
            {typeAhead}
            <div className={classes.spacer} />
            <Box >
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label='Dense'
                />
            </Box>
        </Toolbar >
    );
};

const MemoizedToolbar = memo(EnhancedTableToolbar, (prev, next) => {
    return prev.dense === next.dense && prev.editing === next.editing;
});

interface EnhancedTableRowProps {
    xsRow: boolean;
    editing: boolean;
    update: TableProps['updateCards'];
    data: DeckEditorRow;
    cards: CardsState;
}

const EnhancedTableRow: React.FC<EnhancedTableRowProps> = (props) => {
    const { xsRow, editing, data, cards, update } = props;

    const handleRowChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id.split(':::');
        const value = Number.parseInt(event.target.value, 10);
        if (Number.isInteger(value) && value >= 0) {
            update([{ ...data, [id[1]]: Number.parseInt(event.target.value, 10) }]);
        }
    };

    const cardModel = new CardModel(singleCardSelector(cards, data.id));

    if (editing) {
        return (
            <React.Fragment>
                <TableCell component='th' scope='row'>
                    {cardModel.name()}
                </TableCell>
                {xsRow ? null :
                    <TableCell align='left'>
                        {cardModel.typeLine()}
                    </TableCell>}
                <TableCell align='left'>
                    {cardModel.setName}
                </TableCell>
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
            <TableCell component='th' scope='row'>{cardModel.name()}</TableCell>
            {xsRow ? null : <TableCell align='left'>{cardModel.typeLine()}</TableCell>}
            <TableCell align='left'>{cardModel.setName}</TableCell>
            <TableCell align='right'>{data.quantity}</TableCell>
            <TableCell align='right'>{data.sideboard}</TableCell>
            {xsRow ? null : <TableCell align='right'>{data.owned}</TableCell>}
        </React.Fragment>
    );
};

const MemoizedRow = memo(EnhancedTableRow, (prev, next) => {
    return prev.data === next.data && prev.editing === next.editing && prev.xsRow === next.xsRow;
});

interface TableProps extends BaseComponentProps, MappedTable {
}

const EnhancedTable: React.FC<TableProps> = (props) => {
    const { cardList, cardData, editing, updateCards, addCardByName } = props;
    const classes = useStyles({});
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TableRow>('name');
    const [dense, setDense] = React.useState(false);
    const theme = useTheme<Theme>();
    const xsBreak = useMediaQuery(theme.breakpoints.down('xs'));

    function handleRequestSort(event, property: keyof TableRow) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    const tableCards: TableRow[] = cardsSelector(cardData, Object.keys(cardList)).map((card) => {
        const model = new CardModel(card);
        return {
            id: model.id,
            name: model.name(),
            type: model.typeLine(),
            set: model.set,
            quantity: cardList[model.id].quantity,
            sideboard: cardList[model.id].sideboard,
            owned: cardList[model.id].owned
        };
    });

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <MemoizedToolbar
                    dense={dense}
                    setDense={setDense}
                    editing={editing}
                    addCardByName={addCardByName}
                />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size={'small'}
                        padding={dense ? 'checkbox' : 'default'}
                    >
                        <MemoizedHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(tableCards, getSorting(order, orderBy))
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover={true}
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <MemoizedRow
                                                xsRow={xsBreak}
                                                editing={editing}
                                                update={updateCards}
                                                data={cardList[row.id]}
                                                cards={cardData}
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
