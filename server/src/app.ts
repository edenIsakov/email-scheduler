import express from 'express';
import cors from 'cors';
import definitions from './routes/definitions';

import './scripts/defintionWorker';
import './scripts/mailWorker'

const port: number = 8080;
const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/definitions', definitions);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

