/**
 * Split to another service
 */
import dataStore from "../dataStorages/dataStore";
import mailsToExecute from "../dataStorages/mailsToExecute";
import { Definition } from "../interfaces/definition"
import { Status } from "../interfaces/status";

const sendMail = (definition: Definition) => {
  const milisec = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    console.log(`Send mail ${definition.id} take ${milisec * 100} sec`);
  }, milisec);
}

const dealWithMails = () => {
  setInterval(async () => {
    if (!mailsToExecute.isEmpty()) {
      const id = mailsToExecute.getFirst();
      const definition = dataStore.getById(id);
      try {
        await sendMail({ id, ...definition });
        dataStore.addToDone(id, definition.nextTime);
      } catch (error) {
        dataStore.setStatus(id, Status.error);
      }
    }
  }, 1500)
}

dealWithMails();