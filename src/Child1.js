import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  state = {
    company: "Apple", // Default Company
    selectedMonth: "November", // Default Month
    filteredData: [] // Filtered data to be visualized
  };

  componentDidMount() {
    // Initially filter the data with default selections
    this.filterData();
    this.createChart();
  }

  componentDidUpdate(prevProps, prevState) {
    // Re-filter the data if the company, month, or data changes
    if (
      prevState.company !== this.state.company ||
      prevState.selectedMonth !== this.state.selectedMonth ||
      prevProps.csv_data !== this.props.csv_data
    ) {
      this.filterData();
      this.createChart(); // Update the chart after filtering
    }
  }

  // Function to filter data based on selected company and month
  filterData = () => {
    const { company, selectedMonth } = this.state;
    const { csv_data } = this.props;

    if (!csv_data || csv_data.length === 0) {
      this.setState({ filteredData: [] });
      return;
    }

    const filtered = csv_data.filter((row) => {
      const date = new Date(row.Date); // Convert date string to Date object
      const monthName = date.toLocaleString("default", { month: "long" }); // Get month name
      return row.Company === company && monthName === selectedMonth;
    });

    this.setState({ filteredData: filtered });
  };

  handleCompanyChange = (event) => {
    this.setState({ company: event.target.value });
  };

  handleMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  createChart = () => {
    const { filteredData } = this.state;
    d3.select("#chart").selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    if (filteredData.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("No data available for the selected filters");
      return;
    }

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => new Date(d.Date)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(filteredData, (d) => Math.min(d.Open, d.Close)), d3.max(filteredData, (d) => Math.max(d.Open, d.Close))])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b %d"));
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(yAxis);

    const lineGenerator = (key, color) => {
      return d3.line()
        .x((d) => xScale(new Date(d.Date)))
        .y((d) => yScale(d[key]))
        .curve(d3.curveMonotoneX);
    };

    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#b2df8a")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator("Open"));

    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#e41a1c")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator("Close"));

    const tooltip = d3.select("#chart").append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px");

    const addCircles = (key, color) => {
      svg.selectAll(`circle.${key}`)
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", key)
        .attr("cx", (d) => xScale(new Date(d.Date)))
        .attr("cy", (d) => yScale(d[key]))
        .attr("r", 4)
        .attr("fill", color)
        .on("mouseover", (event, d) => {
          tooltip.style("opacity", 1).html(`
            <strong>Date:</strong> ${d.Date}<br/>
            <strong>${key} Price:</strong> ${d[key]}<br/>
            <strong>Difference (Close - Open):</strong> ${d.Close - d.Open}
          `);
        })
        .on("mousemove", (event) => {
          tooltip.style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 30 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });
    };

    addCircles("Open", "#b2df8a");
    addCircles("Close", "#e41a1c");

    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, 10)`);

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#b2df8a");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("Open")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#e41a1c");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 32)
      .text("Close")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");
  };

  render() {
    const options = ["Apple", "Microsoft", "Amazon", "Google", "Meta"];
    const months = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ];
    const { company, selectedMonth } = this.state;

    return (
      <div className="child1">
        <div>
          <h3>Select a Company:</h3>
          {options.map((option) => (
            <label key={option} style={{ marginRight: "15px" }}>
              <input
                type="radio"
                value={option}
                checked={company === option}
                onChange={this.handleCompanyChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3>Select a Month:</h3>
          <select
            value={selectedMonth}
            onChange={this.handleMonthChange}
            style={{ padding: "5px", fontSize: "16px" }}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div id="chart" style={{ marginTop: "20px", position: "relative" }}></div>
      </div>
    );
  }
}

export default Child1;
