
export const getFilledItemsCount = (arr: any[]): number => {
    let count = 0;
    // Unassigned values are not iterated in a forEach loop.
    arr.forEach(() => {
        count += 1
    });
    return count;
}
