import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import React from 'react';
import TypeAhead from './TypeAhead';

function createData(name: string, type: string, quantity: number, sideboard: number, owned: number) {
    return { name, type, quantity, sideboard, owned };
}

const rows = [
    createData('Mana Crypt', 'Artifact', 1, 0, 1),
    createData('Sol Ring', 'Artifact', 1, 0, 1),
    createData('Sorcerous Spyglass', 'Artifact', 0, 1, 1),
    createData('Island', 'Land', 10, 0, 10),
    createData('Timetwister', 'Sorcery', 1, 0, 1)
];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) { return order; }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'sideboard', numeric: true, disablePadding: false, label: 'Sideboard' },
    { id: 'owned', numeric: true, disablePadding: false, label: 'Owned' }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map((row) => (
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
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: '1 1 20%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles({});
    const { numSelected, dense, densityFunc } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                <Typography variant='h6' id='tableTitle'>
                    Nutrition
          </Typography>
            </div>
            <TypeAhead />
            <div className={classes.spacer} />
            <Tooltip title='Make each row take less vertical space'>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={densityFunc} />}
                    label='Compact'
                />
            </Tooltip>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    tableWrapper: {
        overflowX: 'auto'
    }
}));

export function EnhancedTable(props) {
    const classes = useStyles({});
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);

    const { style } = props;

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleChangeDense(event) {
        setDense(event.target.checked);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <div style={style}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} dense={dense} densityFunc={handleChangeDense} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .map((row) => {
                                    const isItemSelected = isSelected(row.name);
                                    return (
                                        <TableRow
                                            hover={true}
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell component='th' scope='row'>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align='left'>{row.type}</TableCell>
                                            <TableCell align='right'>{row.quantity}</TableCell>
                                            <TableCell align='right'>{row.sideboard}</TableCell>
                                            <TableCell align='right'>{row.owned}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label='Save Deck'
            />
        </div>
    );
}

function DefaultGroupedField(props) {
    const { style } = props;
    return (
        <div style={style}>
            <MaterialTable
                title='Default Grouped Field Preview'
                columns={[
                    { title: 'Name', field: 'name', defaultGroupOrder: 0 },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    { title: 'Birth Place', field: 'birthCity', type: 'numeric' }
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 }
                ]}
                options={{
                    grouping: true,
                    search: false
                }}
            />
        </div>
    );
}

export default DefaultGroupedField;
