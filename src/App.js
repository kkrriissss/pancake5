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
  const [tooltipData, setTooltipData] = useState(null); 
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); 
  const [tooltipColor, setTooltipColor] = useState("");

  const handleMouseOver = (modelKey, mousePosition) => {
    if (!data || data.length === 0) return;

    const tooltipBarData = data.map((d) => ({
      month: d3.timeFormat("%b")(d.Date),
      value: d[modelKey],
    }));

    const legendItem = legendData.find((item) => item.label === modelKey);
    setTooltipColor(legendItem ? legendItem.color : "gray");
    setTooltipData(tooltipBarData);
    setTooltipPosition(mousePosition);
  };

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center", color: "#0f0f0f" }}>KS-A6</h1>

      <FileUpload set_data={setData} />

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
