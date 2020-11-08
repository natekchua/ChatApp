import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message'
import './Conversation.css';

const Conversation = (props) => {
  const { messages, users, id } = props;

  // iterate through a user's messages and update the user color for every outdated message.
  if (users && messages) {
    users.forEach(u => {
      messages.map(m => {
        if (m.user.id === u.id && !m.mod) {
          if (m.user.color !== u.color) {
            let messageToUpdate = Object.assign({}, m);
            messageToUpdate.user.color = u.color;
            return messageToUpdate;
          }
          return m;
        }
        return m;
      })  
    })
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
