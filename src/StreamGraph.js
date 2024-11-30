import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StreamGraph = ({ data, onMouseOver, onMouseOut, colors, keys }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 40, bottom: 30, left: 20 };

    const stackedData = d3
      .stack()
      .keys(keys)
      .offset(d3.stackOffsetWiggle)(data);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(stackedData, (layer) => d3.min(layer, (d) => d[0])),
        d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])),
      ])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);
    svg
      .selectAll("path")
      .data(stackedData)
      .join("path")
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveBasis)
          .x((d) => xScale(d.data.Date))
          .y0((d) => yScale(d[0]))
          .y1((d) => yScale(d[1]))
      )
      .attr("fill", (d) => colorScale(d.key))
      .on("mouseover", function (event, d) {
        const modelData = d.map((point) => ({
          month: d3.timeFormat("%b")(point.data.Date),
          value: point[1] - point[0],
        }));
        onMouseOver(event, modelData, colorScale(d.key));
      })
      .on("mouseout", onMouseOut);
    const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%b"));
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);
    svg.on("mouseout", onMouseOut);
  }, [data, onMouseOver, onMouseOut, colors, keys]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default StreamGraph;
