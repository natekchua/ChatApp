import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = (props) => {
  const { message, name } = props;
  const { text, user } = message;

  let isCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) isCurrentUser = true;

  return (
    isCurrentUser
      ? (
        <div className="message-container justify-end">
          <p className="sent-text pr-10">{trimmedName}</p>
          <div className="message-box bg-blue">
            <p style={{ color: '#fff'}} className="message-text">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="message-container justify-start">
          <div className="message-box bg-light">
            <p style={{ color: '#353535' }} className="message-text">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sent-text pl-10">{user}</p>
        </div>
      )
  )
}

export default Message;
