import React, { useState } from "react";
import FileUpload from "./FileUpload";
import StreamGraph from "./StreamGraph";
import Legend from "./Legend";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Parsed data from CSV
  const [legendData, setLegendData] = useState([]); // Legend data for the graph

  return (
    <div className="App">
      <h1 className="app-title">LLM Hashtag Trends</h1>

      {/* File Upload Component */}
      <FileUpload set_data={setData} />

      {/* Display StreamGraph and Legend when data is available */}
      {data.length > 0 && (
        <div className="graph-container">
          <StreamGraph data={data} setLegendData={setLegendData} />
          <Legend legendData={legendData} />
        </div>
      )}
    </div>
  );
}

export default App;
