import React, { useContext } from "react";
import "../../styles/navbar.scss";
import { ScrollContext } from "../context/ScrollContext";

function Navbar() {
  const scrollContext = useContext(ScrollContext);

  const scrollToSection = () => {};

  return (
    <>
      <header className="header">
        <span className="header-name">ValentinBooking</span>
        <div className="header-controls">
          <div className="control">
            <i className="fa-solid fa-plane-departure"></i>
            <span
              onClick={() => {
                setTimeout(() => {
                  scrollContext.formSectionRef.current?.scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                  });
                }, 0);
              }}
            >
              Book a trip
            </span>
          </div>
          <div className="control">
            <i className="fa-solid fa-list"></i>
            <span
              onClick={() => {
                setTimeout(() => {
                  scrollContext.bookingListingSectionRef.current?.scrollIntoView(
                    { block: "start", behavior: "smooth" }
                  );
                }, 0);
              }}
            >
              Your trips
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
