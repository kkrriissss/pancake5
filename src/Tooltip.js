import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Tooltip = ({ data, color, position }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 550;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const barColor = color;

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("fill", barColor);


    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5));
  }, [data, color]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        pointerEvents: "none",
        background: "white",
        border: "1px solid lightgray",
        borderRadius: "4px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "10px",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Tooltip;
