import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import './App.css';

const App = () => (
  <Router>
    <Route path='/' exact component={Home} />
    <Route path='/chat' exact component={Chat} />
  </Router>
)

export default App;
