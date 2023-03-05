export const removeDuplicates = <T,>(array: T[]): T[] => Array.from(new Set(array));

export interface IDuplicateOccurence<T> {
  item: T;
  times: number;
}

export const getDuplicateOccurences = <T,>(array: T[]): IDuplicateOccurence<T>[] => {
  const uniqueItems = removeDuplicates(array);

  const duplicateOccurences = uniqueItems.map(item => {
    const times = array.reduce((acc, cur) => cur === item ? ++acc : acc, 0);
    return { item, times };
  });

  return duplicateOccurences;
}