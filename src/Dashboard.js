import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function Dashboard({ data }) {
  const [selectedTweet, setSelectedTweet] = useState(null);

  // Extract arrays for plotting
  const x = data.map(d => d["Dimension 1"]);
  const y = data.map(d => d["Dimension 2"]);
  const sentiment = data.map(d => d.Sentiment);
  const months = data.map(d => d.Month);
  const rawTweets = data.map(d => d.RawTweet);

  // We'll use a color scale from red (negative) to green (positive).
  // Plotly’s colorscale: [[0, 'red'], [0.5, 'white'], [1, 'green']]
  // Normal sentiment range: -1 to 1. We must convert this range [ -1, 1 ] to [0,1].
  const normSentiment = sentiment.map(s => (s + 1) / 2);

  return (
    <div>
      <h2>Twitter Data Visualization</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label><b>Color By: Sentiment</b></label>
        </div>
        <Plot
          data={[
            {
              x: x,
              y: y,
              mode: 'markers',
              marker: {
                size: 10,
                cmin: 0,
                cmax: 1,
                color: normSentiment,
                colorscale: [
                  [0, 'red'],
                  [0.5, 'white'],
                  [1, 'green']
                ],
                showscale: true,
                colorbar: {
                  title: 'Sentiment',
                  titleside: 'right'
                }
              },
              text: rawTweets,
              hoverinfo: 'text'
            }
          ]}
          layout={{
            width: 800,
            height: 500,
            title: '',
            xaxis: { title: 'Dimension 1' },
            yaxis: { title: 'Dimension 2' }
          }}
          onHover={(event) => {
            const pointIndex = event.points[0].pointIndex;
            setSelectedTweet(rawTweets[pointIndex]);
          }}
          onClick={(event) => {
            const pointIndex = event.points[0].pointIndex;
            setSelectedTweet(rawTweets[pointIndex]);
          }}
        />
      </div>
      {selectedTweet && (
        <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '10px' }}>
          <h3>Selected Tweet</h3>
          <p>{selectedTweet}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
