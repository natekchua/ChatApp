import React from 'react';
import './Input.css';

const Input = (props) => {
  const { message, setMessage, sendMessage } = props
  return (
    <form className="form">
    <input 
      className="input"
      type="text"
      placeholder="Send a message..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null }
    />
    <button className="send-button" onClick={e => sendMessage(e)}>Send</button>
  </form>
  )
}

export default Input;
