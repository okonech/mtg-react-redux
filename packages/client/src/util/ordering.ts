export function desc<T extends {}>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis: Array<[T, number]> = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function getSorting<T>(order: string, orderBy: keyof T) {
    return order === 'desc' ? (a: T, b: T) => desc(a, b, orderBy) : (a: T, b: T) => -desc(a, b, orderBy);
}
