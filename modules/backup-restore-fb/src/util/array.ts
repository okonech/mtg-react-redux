export function chunk(myArray: any[], chunk_size) {
    const results: any[][] = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}
