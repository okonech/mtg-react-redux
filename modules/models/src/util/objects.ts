export function deleteEmpty(test: object, recurse: boolean) {
    for (const i in test) {
        if (test[i] === null || test[i] === undefined) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            deleteEmpty(test[i], recurse);
        }
    }
}
