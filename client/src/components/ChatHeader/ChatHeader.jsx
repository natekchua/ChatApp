import React from 'react';
import './ChatHeader.css';
import ReactEmoji from 'react-emoji';
import closeIcon from '../../icons/closeIcon.png';

const ChatHeader = () => {

  return (
    <div className="chat-header">
      <div className="left-container">
        <p>{ReactEmoji.emojify(':)')}</p>
        <h3>Nate's Chat Room</h3>
        <a href='/' onClick={() => test()}><img src={closeIcon} alt="close"/></a>
      </div>
    </div>
  ) 
}

export default ChatHeader;
