import moment from "moment";
import dataStore from "../dataStorages/dataStore";
import mailsToExecute from "../dataStorages/mailsToExecute";
import sortedQueue from "../dataStorages/sortedQueue";
import { DefinitionTimeOut, PartOfDefinition } from "../interfaces/definition";
import { Status } from "../interfaces/status";
import { addDefenitionsToTreatment } from "../services/definitions";

let currentDefinition: DefinitionTimeOut = null;

const treatDefenition = (definition: PartOfDefinition) => {
  const deftime = moment(definition.nextTime);
  const currentTime = moment();
  const timeOut = setTimeout(() => {
    currentDefinition = null;
    mailsToExecute.addOne(definition.id);
    dataStore.setStatus(definition.id, Status.sendToMailService)
    addDefenitionsToTreatment([dataStore.getById(definition.id)]);
    console.log(`${definition.id} sent to mail service`);
  }, deftime.diff(currentTime));
  currentDefinition = { ...definition, timeOut }
}

const runDefinitionsService = () => {
  setInterval(() => {
    if (!sortedQueue.isEmpty()) {
      if (currentDefinition) {
        const definition = sortedQueue.getFirst();
        if (moment(definition.nextTime) < moment(currentDefinition.nextTime)) {
          clearTimeout(currentDefinition.timeOut);
          treatDefenition(definition);
        } else {
          sortedQueue.addOne(definition);
        }
      } else {
        const definition = sortedQueue.getFirst();
        treatDefenition(definition);
      }
    }
  }, 1000)
};

runDefinitionsService();