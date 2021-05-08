
import { addDefenitionsToTreatment } from '../services/definitions';



const treatDefinitions = async (req, res, next) => {
  const definitions = req.body;

  try {
    await addDefenitionsToTreatment(definitions);
    res.status(200).send('Added definitions to service');
  } catch (error) {
    res.status(500).send('Failed To add definitions to service');
  }

}

export { treatDefinitions }