// Get a copy of an object with only the specified dynamically defined keys
export function getSubset(keys: any[], obj: any) {
    return keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});
}

// Get a copy of an object excluding the specified dynamically defined keys
export function getSubsetExclude(keys: any[], obj: any) {
    return Object.keys(obj)
        .filter((k) => !keys.includes(k))
        .map((k) => Object.assign({}, { [k]: obj[k] }))
        .reduce((res, o) => Object.assign(res, o), {});
}
