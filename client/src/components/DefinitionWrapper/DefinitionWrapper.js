import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PendingDefinitions from '../PendingDefinitions';
import StatusGroup from '../StatusGroup';
import config from '../../config.json';
import GenerateDefinitionsBtn from '../GenerateDefinitionsBtn';
import './DefinitionWrapper.css'

function DefinitionWrapper() {
  const [definitions, setDefinitions] = useState([]);
  const [errorDefinitions, setErrorDefinitions] = useState({});
  const [doneDefinitions, setDoneDefinitions] = useState({});


  useEffect(() => {
    async function getData() {
      const result = await axios.get(`${config.serverhost}/definitions`);
      const pendingDefinitions = result.data || [];
      setDefinitions(pendingDefinitions);
    }
    async function getDoneDefinitions() {
      const result = await axios.get(`${config.serverhost}/definitions/done`);
      const definitions = result.data || {};
      setDoneDefinitions(definitions);
    }
    async function getErrorDefinitions() {
      const result = await axios.get(`${config.serverhost}/definitions/error`);
      const definitions = result.data || {};
      setErrorDefinitions(definitions);
    }
    getData();
    getDoneDefinitions();
    getErrorDefinitions();
    setInterval(() => {
      getData();
      getDoneDefinitions();
      getErrorDefinitions();
    }, 6000);
  }, []);



  return (
    <>
      <GenerateDefinitionsBtn />
      <div className="definition-weapper">
        <PendingDefinitions definitions={definitions} />
        <div className="status-wrapper">
          {
            Object.keys(doneDefinitions).length !== 0 &&
            (<div>
              <StatusGroup status='done' definitions={doneDefinitions} />
            </div>)
          }
          {
            Object.keys(errorDefinitions).length !== 0 &&
            (<div>
              <StatusGroup status='error' definitions={errorDefinitions} />
            </div>)
          }
        </div>
      </div>
    </>

  );
}

export default DefinitionWrapper;
