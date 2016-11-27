export function containsAll(arr1, arr2) {
    return arr2.every(arr2Item => arr1.includes(arr2Item));
}

export function sameMembers(arr1, arr2) {
    return containsAll(arr1, arr2) && containsAll(arr2, arr1);
}
