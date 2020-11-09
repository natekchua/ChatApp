import React from 'react';
import { Badge } from 'antd';

import './SideContent.css';

const SideContent = (props) => {
  const { users, userID } = props

  return (
    <div className="side-content">
    {
      users
        ? (
          <div>
            <h1>Active users:</h1>
            <div className="active-users">
              <h2>
                {users.map(({id, name}) => (
                  <div key={id} className="active-item">
                    {id === userID ? `${name} (you)` : `${name}`}
                    <Badge style={{ padding: '0 12px' }}status="processing" />
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
  )
}

export default SideContent;
