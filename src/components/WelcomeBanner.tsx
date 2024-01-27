import React from 'react';
import '../styles/welcome-banner.scss';

function WelcomeBanner() {
  return (
    <>
        <div className='banner-wrapper'>
            <img src={require('../assets/images/plane-image.jpg')} alt='plane taking off' />
            <h1>
                Book your trip now!
            </h1>
        </div>
    </>
  );
}

export default WelcomeBanner;