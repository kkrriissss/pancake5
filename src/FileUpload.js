import React, { Component } from 'react';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      jsonData: null, // To store the parsed JSON data
    };
  }

  handleFileSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const json = this.csvToJson(text);
        this.setState({ jsonData: json }); // Save the parsed data in state
        this.props.set_data(json); // Pass the parsed data to the parent component
      };
      reader.readAsText(file);
    }
  };

  csvToJson = (csv) => {
    const lines = csv.split("\n"); // Split CSV into rows
    const headers = lines[0].split(","); // Extract headers from the first row
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(","); // Split each row by comma
      const obj = {};

      // Map each column to its corresponding header
      headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index]?.trim(); // Trim to remove extra spaces
      });

      // Add object to result if it's not an empty row
      if (Object.keys(obj).length && lines[i].trim()) {
        const parsedObj = {
          Date: new Date(obj.Date), // Parse Date field
          GPT4: parseInt(obj["GPT-4"], 10), // Parse GPT-4 hashtags as integers
          Gemini: parseInt(obj["Gemini"], 10), // Parse Gemini hashtags
          PaLM2: parseInt(obj["PaLM-2"], 10), // Parse PaLM-2 hashtags
          Claude: parseInt(obj["Claude"], 10), // Parse Claude hashtags
          LLaMA31: parseInt(obj["LLaMA-3.1"], 10), // Parse LLaMA-3.1 hashtags
        };
        result.push(parsedObj);
      }
    }

    return result;
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
        <h2>Upload a CSV File</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input type="file" accept=".csv" onChange={(event) => this.setState({ file: event.target.files[0] })} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
