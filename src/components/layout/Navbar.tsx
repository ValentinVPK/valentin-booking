import React from 'react';
import '../../styles/navbar.scss';

function Navbar() {
  return (
    <>
        <header className='header'>
            <span className='header-name'>
                ValentinBooking
            </span>
            <div className='header-controls'>
                <div className='control'>
                    <i className="fa-solid fa-plane-departure"></i>
                    <span onClick={() => {}}>Book a trip</span>
                </div>
                <div className='control'>
                    <i className="fa-solid fa-list"></i>
                    <span onClick={() => {}}>Your trips</span>
                </div>
            </div>
        </header>
    </>
  );
}

export default Navbar;