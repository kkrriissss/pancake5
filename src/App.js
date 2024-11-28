import React, { useState } from "react";
import "./App.css";
import Upload from "./components/FileUpload";
import Streamgraph from "./components/Streamgraph";
import Legend from "./components/Legend";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <h1>Hashtag Trends for LLMs</h1>
      {!data ? (
        <Upload setData={setData} />
      ) : (
        <>
          <Streamgraph data={data} />
          <Legend />
        </>
      )}
    </div>
  );
}

export default App;