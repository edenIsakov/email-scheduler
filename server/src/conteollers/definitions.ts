
import serviceDefinition from '../services/definitions';



const treatDefinitions = async (req, res, next) => {
  const definitions = req.body;

  try {
    await serviceDefinition.addDefenitionsToTreatment(definitions);
    res.status(200).send('Added definitions to service');
  } catch (error) {
    res.status(500).send('Failed To add definitions to service');
  }

}

const getDefinitions = async (req, res, next) => {
  try {
    const definitions = await serviceDefinition.getDefinitions();
    res.status(200).send(definitions);
  } catch (error) {
    res.status(500).send('Failed To get definitions');
  }
}

const getDoneDefinitions = async (req, res, next) => {
  try {
    const definitions = await serviceDefinition.getDoneDefinitions();
    res.status(200).send(definitions);
  } catch (error) {
    res.status(500).send('Failed To get definitions');
  }
}

const getErrorDefinitions = async (req, res, next) => {
  try {
    const definitions = await serviceDefinition.getErrorDefinitions();
    res.status(200).send(definitions);
  } catch (error) {
    res.status(500).send('Failed To get definitions');
  }
}

export {
  treatDefinitions,
  getDefinitions,
  getDoneDefinitions,
  getErrorDefinitions
}