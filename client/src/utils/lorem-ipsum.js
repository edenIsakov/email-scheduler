import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 30,
    min: 1
  },
  wordsPerSentence: {
    max: 16,
    min: 3
  }
});

export default lorem;