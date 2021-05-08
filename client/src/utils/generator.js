import randomEmail from 'random-email';
import rc from 'random-cron';
import lorem from './lorem-ipsum';
import { randomTimezone } from './timezone';


const generateBulk = async () => {
  const bulkNumber = Math.floor(Math.random() * 10) + 5;
  const bulk = [];
  for (let i = 0; i < bulkNumber; i++) {
    const numPragraphs = Math.floor(Math.random() * 20)
    bulk.push({
      resipientsList: [randomEmail(), randomEmail()],
      body: lorem.generateParagraphs(numPragraphs),
      recurrence: rc.some('weekday').between(1, 5)
        .some('hour').between(1, 12)
        .generate(),
      timezone: randomTimezone(),
      priority: Math.floor(Math.random() * 2),
    });
  }
}
export { generateBulk }