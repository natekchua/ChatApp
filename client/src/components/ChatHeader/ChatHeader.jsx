import React from 'react';
import './ChatHeader.css';
import ReactEmoji from 'react-emoji';
import closeIcon from '../../icons/closeIcon.png';
import io from 'socket.io-client';

const ENDPOINT = 'localhost:3000';

let socket; 

const ChatHeader = (props) => {
  const { username, userID } = props;

  const test = () => {
    socket = io(ENDPOINT);
    console.log(`${username}, ${userID} logged out`)
    localStorage.setItem('username', username);
    localStorage.setItem('id', userID);
    socket.emit('handleLocalStorage', localStorage); 
  }

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
