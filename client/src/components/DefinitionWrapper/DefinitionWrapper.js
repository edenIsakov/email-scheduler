import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PendingDefinitions from '../PendingDefinitions';
import StatusGroup from '../StatusGroup';
import config from '../../config.json';
import { generateBulk } from '../../utils/generator';

import 'react-toastify/dist/ReactToastify.css';
import './DefinitionWrapper.css'

function DefinitionWrapper() {
  const [definitions, setDefinitions] = useState([]);
  const [errorDefinitions, setErrorDefinitions] = useState({});
  const [doneDefinitions, setDoneDefinitions] = useState({});

  const getData = useCallback(async () => {
    const result = await axios.get(`${config.serverhost}/definitions`);
    const pendingDefinitions = result.data || [];
    setDefinitions(pendingDefinitions);
  }, [])
  const getDoneDefinitions = useCallback(async () => {
    const result = await axios.get(`${config.serverhost}/definitions/done`);
    const definitions = result.data || {};
    setDoneDefinitions(definitions);
  }, [])
  const getErrorDefinitions = useCallback(async () => {
    const result = await axios.get(`${config.serverhost}/definitions/error`);
    const definitions = result.data || {};
    setErrorDefinitions(definitions);
  }, [])

  const generate = useCallback(async () => {
    const bulk = generateBulk();
    await axios.post(`${config.serverhost}/definitions`, bulk);
    toast(`${bulk.length} definitions send to the server`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    getData();
    getDoneDefinitions();
    getErrorDefinitions();
  }, [getData, getDoneDefinitions, getErrorDefinitions]);

  useEffect(() => {
    getData();
    getDoneDefinitions();
    getErrorDefinitions();
    setInterval(() => {
      getData();
      getDoneDefinitions();
      getErrorDefinitions();
    }, 6000);
  }, [getData, getDoneDefinitions, getErrorDefinitions]);




  return (
    <>
      <button className="generate" onClick={generate}>Generate random definitions</button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
