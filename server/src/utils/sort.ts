import { PartOfDefinition } from "../interfaces/definition";

const sortBydateAndPriority = (a: PartOfDefinition, b: PartOfDefinition) => {
  const aDate = new Date(a.nextTime);
  const bDate = new Date(b.nextTime);

  if (bDate > aDate) {
    return -1;
  } else if (bDate < aDate) {
    return 1;
  } else {
    return b.priority - a.priority;
  }
}

export {
  sortBydateAndPriority
};