import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message'
import './Conversation.css';

const Conversation = (props) => {
  const { messages, id } = props;

  return (
  <ScrollToBottom className="messages">
    {messages.map((message, i) =>
    <div key={i}>
      <Message 
        message={message}
        id={id}
      />
    </div>)}
  </ScrollToBottom>
  )
}

export default Conversation;
