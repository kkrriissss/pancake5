import React, { useState } from "react";
import "./App.css";
import Upload from "./Upload";
import Streamgraph from "./Streamgraph";
import Legend from "./Legend";

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