import React from 'react';
import activeIcon from '../../icons/activeIcon.png';

import './SideContent.css';

const SideContent = (props) => {
  const { users } = props
  return (
    <div className="side-content">
    {
      users
        ? (
          <div>
            <h1>Active users chatting:</h1>
            <div className="active-users">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="active-item">
                    {name}
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
