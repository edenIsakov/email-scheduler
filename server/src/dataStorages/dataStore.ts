
/**
 * We can replace this file with db
 */

import { DefinitionInput, DefinitionsKeyValue, DefinitionAndTime } from "../interfaces/definition";
import { Status } from "../interfaces/status";

const definitions: DefinitionsKeyValue = {}

const doneDefinitions: DefinitionAndTime = {};

const errorDefinitions: DefinitionAndTime = {};

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

const addToError = (id, time) => {
  delete definitions[id];
  if (!errorDefinitions[id]) {
    errorDefinitions[id] = [time];
  } else {
    errorDefinitions[id].push(time);
  }
}

const isEmpty = () => {
  return Object.keys(definitions).length === 0;
}

const getAllDefinitions = () => {
  return definitions;
}

const getDoneDefinitions = () => {
  return doneDefinitions;
}

const getErrorDefinitions = () => {
  return errorDefinitions;
}

export default {
  getById,
  addOne,
  setStatus,
  addToDone,
  isEmpty,
  getAllDefinitions,
  addToError,
  getDoneDefinitions,
}