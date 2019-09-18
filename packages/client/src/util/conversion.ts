export function arrayToObject<T, K extends keyof T>(arr: T[], keyField: K): { K: T } {
    return Object.assign({}, ...arr.map((item) => ({ [item[keyField as any]]: item })));
}
