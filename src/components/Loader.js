import React from "react";

const Loader = props => {
  return (
    <div className="loader">
      {/* <div id="loader-6">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>*/}
      <div id="anim-wrapper">
        <div id="anim-bg">
          <div id="env-wrapper">
            <div className="speedline line1" />
            <div className="speedline line2" />
            <div className="speedline line3" />
            <i id="env" className="fas fa-envelope" />
          </div>
        </div>

        <div id="check-container">
          <div className="check-stroke1" />
          <div className="check-stroke2" />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Loader;
