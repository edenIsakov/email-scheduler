import React, { useCallback } from 'react';
import randomEmail from 'random-email';
import rc from 'random-cron';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import config from '../../config.json';
import { randomTimezone } from '../../utils/timezone';
import lorem from '../../utils/lorem-ipsum';
import './GenerateDefinitionsBtn.css'

import 'react-toastify/dist/ReactToastify.css';

const GenerateDefinitionsBtn = (() => {
  const generate = useCallback(async () => {
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
  }, [])
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
    </>
  );
});

export default GenerateDefinitionsBtn;
