import express from 'express';
import { treatDefinitions, getDefinitions, getDoneDefinitions, getErrorDefinitions } from '../conteollers/definitions';


const router: express.Router = express.Router();

router.get('/', getDefinitions);

router.get('/done', getDoneDefinitions);

router.get('/error', getErrorDefinitions);


router.post('/', treatDefinitions);

export default router;