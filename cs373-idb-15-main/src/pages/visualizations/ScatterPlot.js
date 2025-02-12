import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Visualizations.css";

const ScatterPlot = ({
  data,
  width,
  height,
  xDomainMin,
  xDomainMax,
  yDomainMin,
  yDomainMax,
  xTicks,
  yTicks,
  xLabel,
  yLabel,
  xLabelOffset,
  yLabelOffset,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Setting up container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("overflow", "visible");

    // Setting up scaling
    const xScale = d3
      .scaleLinear()
      .domain([xDomainMin, xDomainMax])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([yDomainMin, yDomainMax])
      .range([height, 0]);

    // Setting up axis
    const xAxis = d3.axisBottom(xScale).ticks(xTicks);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);
    svg.append("g").call(yAxis);

    // Axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + xLabelOffset)
      .text(xLabel);
    svg
      .append("text")
      .attr("y", height / 2)
      .attr("x", -yLabelOffset)
      .text(yLabel);

    // Setting up SVG data
    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 2);
  }, [data]);

  return (
    <div>
      <svg className="svg-graph" ref={svgRef}></svg>
    </div>
  );
};

export default ScatterPlot;
