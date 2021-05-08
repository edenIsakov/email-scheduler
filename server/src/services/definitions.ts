import parser from 'cron-parser';
import { DefinitionInput, PartOfDefinition } from "../interfaces/definition";
import sortedQueue from '../dataStorages/sortedQueue';
import GUID from 'guid';
import dataStore from '../dataStorages/dataStore';
import { Status } from '../interfaces/status';


const addDefenitionsToTreatment = async (defintions: DefinitionInput[]) => {
  const definitionsToAdd: PartOfDefinition[] = defintions.map(definition => {
    const id = GUID.create().value;
    dataStore.addOne(id, { ...definition, status: Status.pendding })
    const options = {
      tz: definition.timezone,
    }
    const interval = parser.parseExpression(definition.recurrence, options);
    const nextTime = interval.next().toString();

    return {
      id,
      priority: definition.priority,
      nextTime,
    }
  });
  sortedQueue.addBulk(definitionsToAdd);
};



export { addDefenitionsToTreatment }