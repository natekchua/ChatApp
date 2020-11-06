import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import io from 'socket.io-client';
import ChatHeader from '../ChatHeader/ChatHeader';
import Input from '../Input/Input';
import Conversation from '../Conversation/Conversation';
import SideContent from '../SideContent/SideContent';

import './Chat.css';

let socket; 

const Chat = (props) => {
  const { location } = props;
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', (error) => {
      if(error) alert(error);
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('notification', (notification) => {
      setNotification(notification.text)
      setName(notification.user);
    })
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message])
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage('')) // clear message when prev message is sent 
    }
  }

  return (
    <div className="outer-container">
      <div className="container">
        <ChatHeader />
        <Alert 
          message={notification}
          type="info"
          showIcon
          banner
          closable
        />
        <Conversation 
          messages={messages}
          name={name}
        />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <SideContent users={users} username={name}/>
    </div>
  )
}

export default Chat;
