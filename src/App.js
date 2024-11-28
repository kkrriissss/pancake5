import React, { useState } from "react";
import * as d3 from "d3";

import FileUpload from "./FileUpload";
import StreamGraph from "./StreamGraph";
import Tooltip from "./Tooltip";
import Legend from "./Legend";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [tooltipData, setTooltipData] = useState(null); // Data for tooltip
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // Position for tooltip
  const [tooltipColor, setTooltipColor] = useState(""); // Color for tooltip

  const handleMouseOver = (modelKey, mousePosition) => {
    if (!data || data.length === 0) return;

    // Prepare data for the tooltip bar chart
    const tooltipBarData = data.map((d) => ({
      month: d3.timeFormat("%b")(d.Date), // Format date to month abbreviation
      value: d[modelKey],
    }));

    const legendItem = legendData.find((item) => item.label === modelKey);
    setTooltipColor(legendItem ? legendItem.color : "gray"); // Set the color based on legend
    setTooltipData(tooltipBarData);
    setTooltipPosition(mousePosition);
  };

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", color: "#377eb8" }}>LLM Hashtag Trends</h1>

      {/* File Upload */}
      <FileUpload set_data={setData} />

      {/* StreamGraph and Legend */}
      {data.length > 0 && (
        <div className="graph-container">
          <div style={{ flex: 1 }}>
            <StreamGraph
              data={data}
              setLegendData={setLegendData}
              onHover={handleMouseOver}
              onHoverOut={handleMouseOut}
            />
          </div>
          <div className="legend">
            <Legend legendData={legendData} />
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltipData && (
        <Tooltip
          data={tooltipData}
          color={tooltipColor}
          position={tooltipPosition}
        />
      )}
    </div>
  );
}

export default App;
