import express from 'express';
import { treatDefinitions } from '../conteollers/definitions';


const router: express.Router = express.Router();

// router('/', (req, res, next) => {
//   //TODO: get defentions
//   console.log('getDefenitions');
// });

router.post('/', treatDefinitions)

export default router;