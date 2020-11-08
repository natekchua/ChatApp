import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message'
import './Conversation.css';

const Conversation = (props) => {
  const { messages, id } = props;

  if (messages.length > 0) {
    const currUserIDmessages = messages.filter(m => m.user.id === id);
    if (currUserIDmessages.length > 0) {
      const mostRecentMessage = currUserIDmessages[currUserIDmessages.length - 1];
      const newestUserColor = mostRecentMessage.user.color;
      messages.map(m => {
        if(m.user.id === id && !m.mod) {
          let messageToUpdate = Object.assign({}, m);
          messageToUpdate.user.color = newestUserColor;
          return messageToUpdate;
        } else {
          return m;
        }
      })
    }
  }

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
