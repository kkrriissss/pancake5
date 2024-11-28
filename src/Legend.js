import React from "react";
import "./App.css";

const Legend = ({ legendData }) => {
  return (
    <div className="legend-container">
      <h3 className="legend-title">Legend</h3>
      <ul className="legend-list">
        {legendData.map((item, index) => (
          <li key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
