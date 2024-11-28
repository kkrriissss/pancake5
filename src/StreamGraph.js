import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StreamGraph = ({ data, setLegendData, onHover, onHoverOut }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 150, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;

    const keys = Object.keys(data[0]).filter((key) => key !== "Date");
    const stackedData = d3
      .stack()
      .keys(keys)
      .offset(d3.stackOffsetWiggle)(data);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(stackedData, (layer) => d3.min(layer, (d) => d[0])),
        d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])),
      ])
      .range([height, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(keys)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

    const legendData = keys.map((key) => ({
      label: key,
      color: colorScale(key),
    }));
    setLegendData(legendData);

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const area = d3
      .area()
      .x((d) => xScale(d.data.Date))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis);

    const layers = svg
      .selectAll(".layer")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", "layer")
      .attr("d", area)
      .style("fill", (d) => colorScale(d.key))
      .style("stroke", "none");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b"))
      );

    layers
      .on("mousemove", (event, d) => {
        const mousePosition = {
          x: event.pageX + 10, // Position tooltip near cursor
          y: event.pageY + 10,
        };
        onHover(d.key, mousePosition);
      })
      .on("mouseout", () => {
        onHoverOut();
      });
  }, [data, setLegendData, onHover, onHoverOut]);

  return <svg ref={svgRef}></svg>;
};

export default StreamGraph;
