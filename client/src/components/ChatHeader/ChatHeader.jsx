import React from 'react';
import ReactEmoji from 'react-emoji';
import closeIcon from '../../icons/closeIcon.png';

import './ChatHeader.css';

const ChatHeader = (props) => {
  const { users, userID } = props;

  const leaveRoom = () => {
    const user = users.find(u => u.id === userID);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <div className="chat-header">
      <div className="left-container">
        <p>{ReactEmoji.emojify(':)')}</p>
        <h3 style={{ fontWeight: 600, marginTop: '5px' }}>Nate's Chat Room</h3>
        <a href='/' onClick={() => leaveRoom()}><img src={closeIcon} alt="close"/></a>
      </div>
    </div>
  ) 
}

export default ChatHeader;
