import React, { memo } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import './PendingDefinitions.css';

const PendingDefinitions = memo(({ definitions }) => {
  return (
    <div className="pending-definitions">
      <h1>Pending definitions</h1>
      <table className="definitions-table">
        <thead>
          <tr>
            <th>definition Id</th>
            <th>nextTime</th>
            <th>priority</th>
            <th>resipients</th>
            <th>emailBody</th>
            <th>timezone</th>
            <th>recurrence</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {definitions.map(definition => (
            <tr className={moment().diff(moment(definition.time), 'seconds') > 60 ? 'over-due' : 'in-time'} key={definition.id}>
              <td>{definition.id}</td>
              <td>{moment(definition.nextTime).format('DD/MM/YYYY HH:mm:ss')}</td>
              <td>{definition.priority}</td>
              <td><div className="resipients">{definition.resipientsList}</div></td>
              <td><div className="email-body">{definition.body}</div></td>
              <td>{definition.timezone}</td>
              <td>{definition.recurrence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
});

PendingDefinitions.prototype = {
  definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default PendingDefinitions;