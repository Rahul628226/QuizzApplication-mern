import React from 'react';
import Header from './Heder';
import background from '../Common/home2.png'; // Import the background image

const Home = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Set the minimum height to fill the viewport
          paddingTop: '100px',
        }}
      >
        {/* <h1>CommonHome</h1> */}
      </div>
    </>
  );
};

export default Home;
