/**
 * Convert an array of objects to a map keyed by the specified property in each object
 */
export function arrayToObject<T, K extends keyof T>(arr: T[], keyField: K): { K: T } {
    return Object.assign({}, ...arr.map((item) => ({ [item[keyField as any]]: item })));
}

/**
 * Hash a string into a 6 digit color code
 */
export function stringToColor(str: string) {
    return `hsl(${stringHash(str) % 360},100%,35%)`;
}

export function stringHash(str: string) {
    let hash = 0;
    if (str.length === 0) { return hash; }
    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line no-bitwise
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line no-bitwise
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
