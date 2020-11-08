import React from 'react';
import activeIcon from '../../icons/activeIcon.png';

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
                    <img alt="Online Icon" src={activeIcon}/>
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
