import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = (props) => {
  const { message, id } = props;
  const { text, user, time } = message;

  return (
    !message.mod && user.id === id
      ? (
        <div className="message-container justify-end">
          <p style={{ color: user.color }} className="sent-text pr-10">{user.name}</p>
          <div className="message-box bg-blue">
            <p style={{ color: '#fff'}} className="message-text">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="timestamp pl-10">{time}</p>
        </div>
      ) : (
        <div className="message-container justify-start">
          <p className="timestamp pr-10">{time}</p>
          <div className="message-box bg-light">
            <p style={{ color: '#353535' }} className="message-text">{ReactEmoji.emojify(text)}</p>
          </div>
          <p style={{ color: message.mod ? '#000' : user.color }} className="sent-text pl-10">{ message.mod ? message.mod : user.name }</p>
        </div>
      )
  )
}

export default Message;
