import React, { Component } from 'react';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  handleFileSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const json = JSON.parse(text);
          this.props.setData(json);
        } catch (err) {
          console.error('Error parsing JSON file:', err);
          alert('Could not parse JSON. Please check the file format.');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file first.');
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20, borderRadius: 5, width: '300px' }}>
        <h2>Upload a JSON File</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input
            type="file"
            accept=".json"
            onChange={(event) => this.setState({ file: event.target.files[0] })}
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
