import { Priority } from "./priotiry";
import { Status } from "./status";



interface PartOfDefinition {
  id: string,
  nextTime: string,
  priority: Priority,
}

interface DefinitionTimeOut extends PartOfDefinition {
  timeOut: ReturnType<typeof setTimeout>,
}
interface DefinitionInput {
  resipientsList: string[],
  emailBody: string,
  recurrence: string,
  timezone: string,
  priority: Priority,
  nextTime?: string,
  status?: Status
}

interface Definition extends DefinitionInput {
  id: string,
}

interface DefinitionsKeyValue {
  [key: string]: DefinitionInput,
}

interface DoneDefinition {
  [key: string]: [string],
}

export {
  Definition,
  DefinitionInput,
  PartOfDefinition,
  DefinitionTimeOut,
  DefinitionsKeyValue,
  DoneDefinition
}