import React from 'react';
import ReactEmoji from 'react-emoji';
import closeIcon from '../../icons/closeIcon.png';

import './ChatHeader.css';

const ChatHeader = () => {

  return (
    <div className="chat-header">
      <div className="left-container">
        <p>{ReactEmoji.emojify(':)')}</p>
        <h3 style={{ fontWeight: 600, marginTop: '5px' }}>Nate's Chat Room</h3>
        <a href='/' onClick={() => test()}><img src={closeIcon} alt="close"/></a>
      </div>
    </div>
  ) 
}

export default ChatHeader;
