import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-outer-container">
      <div className="home-inner-container">
        <h1 className="heading">Nate's Chat Room</h1>
        <Link to={'/chat'}>
          <button className="button mt-20" type="submit">Join the Party</button>
        </Link>
      </div>
    </div>
  )
}

export default Home;