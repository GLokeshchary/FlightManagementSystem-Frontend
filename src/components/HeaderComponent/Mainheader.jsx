import React from "react";
import "./Mainheader.css";
function Mainheader({ name, travellers, cabin, position }) {
  return (
    <div>
      <div className="bookpanelHeader-container">
        <div className="headername">
          <span className={`hbold h${position}`}>{name}</span>
          {travellers && (
            <div className="smallheader">
              <span>{travellers} Travellers - </span>
              <span>{cabin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainheader;
