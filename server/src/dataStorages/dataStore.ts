
/**
 * We can replace this file with db
 */

import { DefinitionInput, DefinitionsKeyValue, DoneDefinition } from "../interfaces/definition";
import { Status } from "../interfaces/status";

const definitions: DefinitionsKeyValue = {}

const doneDefinitions: DoneDefinition = {};

const getById = (id: string): DefinitionInput => {
  return definitions[id];
}
const addOne = (id: string, definition: DefinitionInput): void => {
  definitions[id] = definition;
}
const setStatus = (id: string, status: Status) => {
  definitions[id].status = status;
}

const addToDone = (id, time) => {
  delete definitions[id];
  if (!doneDefinitions[id]) {
    doneDefinitions[id] = [time];
  } else {
    doneDefinitions[id].push(time);
  }
}

const isEmpty = () => {
  return Object.keys(definitions).length === 0;
}

export default {
  getById,
  addOne,
  setStatus,
  addToDone,
  isEmpty,
}