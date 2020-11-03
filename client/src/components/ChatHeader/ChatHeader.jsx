import React from 'react';
import './ChatHeader.css';
import closeIcon from '../../icons/closeIcon.png';

const ChatHeader = (props) => {
  const { room } = props
  return (
    <div className="chat-header">
      <div className="left-container">
        <h3>Room Name: {room}</h3>
      </div>
      <div className="right-container">
        <a href='/'><img src={closeIcon} alt="close"/></a>
      </div>
    </div>
  )
  
}

export default ChatHeader;
