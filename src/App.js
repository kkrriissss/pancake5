import React, { useState } from "react";
import FileUpload from "./FileUpload";
import StreamGraph from "./StreamGraph";
import Legend from "./Legend";
import Tooltip from "./Tooltip";

function App() {
  const [data, setData] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipColor, setTooltipColor] = useState("");

  const handleDataSet = (uploadedData) => {
    const parsedData = uploadedData.map((d) => ({
      ...d,
      Date: new Date(d.Date),
    }));
    setData(parsedData);
  };

  const handleMouseOver = (event, modelData, color) => {
    const { clientX, clientY } = event;
    setTooltipData(modelData);
    setTooltipColor(color);
    setTooltipPosition({ x: clientX + 10, y: clientY + 10 });
  };

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  const keys = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"];
  const colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"];

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "0px" }}>
      <div style={{ marginBottom: "20px" }}>
        <FileUpload setData={handleDataSet} />
      </div>
      {data && (
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px", padding: "0px" }}>
          <StreamGraph
            data={data}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            colors={colors}
            keys={keys}
          />
          <div style={{ marginTop: "150px" }}>
            <Legend keys={keys} colors={colors} />
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
