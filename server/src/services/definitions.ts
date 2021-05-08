import parser from 'cron-parser';
import { Definition, DefinitionAndTime, DefinitionInput, DefinitionsKeyValue, PartOfDefinition } from "../interfaces/definition";
import sortedQueue from '../dataStorages/sortedQueue';
import GUID from 'guid';
import dataStore from '../dataStorages/dataStore';
import { Status } from '../interfaces/status';


const addDefenitionsToTreatment = async (defintions: DefinitionInput[], definitionID?: string): Promise<void> => {
  const definitionsToAdd: PartOfDefinition[] = defintions.map(definition => {
    let id: string;
    if (definitionID) {
      id = definitionID;
    } else {
      id = GUID.create().value;
    }
    const options = {
      tz: definition.timezone,
    }
    const interval = parser.parseExpression(definition.recurrence, options);
    const nextTime = interval.next().toString();
    dataStore.addOne(id, { ...definition, nextTime, status: Status.pendding })

    return {
      id,
      priority: definition.priority,
      nextTime,
    }
  });
  sortedQueue.addBulk(definitionsToAdd);
};

const getDefinitions = async (): Promise<Definition[]> => {
  const definitions: Definition[] = [];
  const definitionsKeyValue: DefinitionsKeyValue = dataStore.getAllDefinitions();
  const ids = Object.keys(definitionsKeyValue);
  for (let id of ids) {
    definitions.push({ id, ...definitionsKeyValue[id] });
  }
  return definitions;
}

const getDoneDefinitions = async (): Promise<DefinitionAndTime> => {
  return dataStore.getDoneDefinitions();
}

const getErrorDefinitions = async (): Promise<DefinitionAndTime> => {
  return dataStore.getDoneDefinitions();
}


export default {
  addDefenitionsToTreatment,
  getDefinitions,
  getDoneDefinitions,
  getErrorDefinitions,
}