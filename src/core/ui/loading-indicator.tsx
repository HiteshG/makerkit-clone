import React from 'react';

const LoadingIndicator = () => {
  return (
    <div style={{position: "fixed", top: "0px", left: "0px", height: "4px", background: "transparent", zIndex: 2147483647, width: "100%"}}>
      <div className="bg-primary" style={{height: "100%", width: "0%", opacity: 1}}>
        <div style={{boxShadow: "0px 0px 10px, 0px 0px 10px", width: "5%", opacity: 1, position: "absolute", height: "100%", transform: "rotate(3deg) translate(0px, -4px)", left: "-5.5%"}}></div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
