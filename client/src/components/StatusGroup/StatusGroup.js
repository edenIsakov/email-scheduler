import React, { memo } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import './StatusGroup.css';

const StatusGroup = memo(({ definitions, status }) => {
  return (
    <div className="status-definitions">
      <h1>{status} definitions</h1>
      <table className="definitions-status-table">
        <thead>
          <tr>
            <th>definition Id</th>
            <th>times</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {Object.keys(definitions).map(id => (
            <tr key={id}>
              <td>{id}</td>
              <td>{definitions[id].map(time => <p>{moment(time).format('DD/MM/YYYY HH:mm:ss')}</p>)}</td>
              <td>{definitions[id].length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

StatusGroup.prototype = {
  definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default StatusGroup;