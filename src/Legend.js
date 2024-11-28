import React from "react";
import "./App.css";

const Legend = ({ legendData }) => {

  const orderedColors = ["#ff7f00", "#984ea3", "#4daf4a", "#377eb8", "#e41a1c"];
  const orderedLabels = ["GPT4", "Gemini", "PaLM2", "Claude", "LLaMA31"];
  const alignedLegendData = orderedLabels.map((label, index) => ({
    label,
    color: orderedColors[index],
  }));

  return (
    <div className="legend-container">
      <h3 className="legend-title">Legend</h3>
      <ul className="legend-list">
        {alignedLegendData.map((item, index) => (
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
