import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
// import "./Visualizations.css";

// D3 bar chart component. Expects a dictionary. Keys = x axis.
const BarChart = ({
  data,
  width,
  height,
  xAxisLabel,
  yAxisLabel,
  xAxisLabelOffset,
  yAxisLabelOffset,
  numYTicks,
  displayXTicks,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Setting up container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("overflow", "visible");

    let values = Object.values(data);
    let keys = Object.keys(data);
    let yMaxValue = Math.max(...values);

    // Setting up scaling
    const xScale = d3.scaleBand().domain(keys).range([0, width]).padding(0.5);
    const yScale = d3.scaleLinear().domain([0, yMaxValue]).range([height, 0]);

    // Setting up axis
    const xAxis = displayXTicks
      ? d3.axisBottom(xScale).ticks(data.length)
      : d3.axisBottom(xScale).ticks(data.length).tickValues([]);
    const yAxis = d3.axisLeft(yScale).ticks(numYTicks);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);
    svg.append("g").call(yAxis);

    // Axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + xAxisLabelOffset)
      .text(xAxisLabel);
    svg
      .append("text")
      .attr("y", height / 2)
      .attr("x", -yAxisLabelOffset)
      .text(yAxisLabel);

    // Setting up SVG data
    svg
      .selectAll()
      .data(keys)
      .join("rect")
      .attr("x", (key) => xScale(key))
      .attr("y", (key) => yScale(data[key]))
      .attr("width", xScale.bandwidth())
      .attr("height", (key) => height - yScale(data[key]))
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .on("mouseover", function (event, d) {
        const tooltipWidth = 100;
        const tooltipHeight = 70;
        const tooltipPadding = 0;
        // show tooltip on mouseover
        const [x, y] = d3.pointer(event);
        const tooltipX = x + tooltipPadding;
        const tooltipY = y - tooltipHeight - tooltipPadding;
        const tooltip = svg.append("g").attr("id", "tooltip");
        tooltip
          .append("rect")
          .attr("x", tooltipX)
          .attr("y", tooltipY)
          .attr("width", tooltipWidth)
          .attr("height", tooltipHeight)
          .attr("rx", 5)
          .attr("ry", 5)
          .style("fill", "#333")
          .style("opacity", 0.85);
        tooltip
          .append("text")
          .attr("x", tooltipX + tooltipWidth / 2)
          .attr("y", tooltipY + tooltipHeight / 2)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "#fff")
          .text(`${d}: ${data[d]}`);
      })
      .on("mouseout", function (event, d) {
        // hide tooltip on mouseout
        svg.select("#tooltip").remove();
      });
  }, [data]);

  return (
    <div>
      <svg className="svg-graph" ref={svgRef}></svg>
      <div id="tooltip" style={{ display: "none" }}></div>
    </div>
  );
};

export default BarChart;
