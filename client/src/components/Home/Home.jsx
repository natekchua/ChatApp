import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="home-outer-container">
      <div className="home-inner-container">
        <h1 className="heading">Nate's Chat Room</h1>
        <div>
          <input placeholder="Name" className="home-input" type="text" onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="home-input mt-20" type="text" onChange={e => setRoom(e.target.value)}/>
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Join the fun!</button>
        </Link>
      </div>
    </div>
  )
}

export default Home;