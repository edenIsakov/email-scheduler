
/**
 * We can replace this file with redis Sorted Sets
 */
import { PartOfDefinition } from "../interfaces/definition";
import { sortBydateAndPriority } from "../utils/sort";

let definitionsQueue: PartOfDefinition[] = [];

const getFirst = (): PartOfDefinition => {
  return definitionsQueue.shift();
}
const addBulk = (bulk: PartOfDefinition[]) => {
  const definitions = [...definitionsQueue, ...bulk];
  definitionsQueue = definitions.sort(sortBydateAndPriority)
}

const addOne = (definition: PartOfDefinition) => {
  const definitions = [...definitionsQueue, definition];
  definitionsQueue = definitions.sort(sortBydateAndPriority)
}

const isEmpty = () => {
  return definitionsQueue.length === 0;
}


export default {
  getFirst,
  addBulk,
  addOne,
  isEmpty,
}