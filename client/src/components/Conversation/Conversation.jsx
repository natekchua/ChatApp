import React, { useEffect } from 'react';
import { animateScroll } from "react-scroll";
import Message from './Message/Message'
import './Conversation.css';

const Conversation = (props) => {
  const { messages, users, id } = props;

  useEffect(() => {
    scrollToBottom();
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
  }, [users, messages])
 
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      duration: 300,
      containerId: "convo"
    });
  }

  return (
    <div className="convo-container">
      <div id="convo">
        {messages.map((message, i) =>
        <div key={i}>
          <Message 
            message={message}
            id={id}
          />
        </div>)}
      </div>
    </div>
  )
}

export default Conversation;
