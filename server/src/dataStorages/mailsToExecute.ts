/**
 * This can be change to queue menagmet
 */

const idsToExecuteQueue: string[] = [];

const getFirst = (): string => {
  return idsToExecuteQueue.shift();
}

const addOne = (definitionID: string) => {
  idsToExecuteQueue.push(definitionID);
}

const isEmpty = () => {
  return idsToExecuteQueue.length === 0;
}

export default {
  getFirst,
  addOne,
  isEmpty,
}