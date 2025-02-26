import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Dashboard from './Dashboard';

function App() {
  const [data, setData] = useState(null);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Twitter Data Dashboard</h1>
      {!data && (
        <div>
          <p>Please upload the <code>tweets.json</code> file to visualize the dashboard.</p>
          <FileUpload setData={setData} />
        </div>
      )}
      {data && (
        <div>
          <Dashboard data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
