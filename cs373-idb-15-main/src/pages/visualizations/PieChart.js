import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Component to model a pie chart. Expects a dictionary for data props.
const PieChart = ({ data, colorMap }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up svg container.
    const width = 500;
    const height = 500;
    const radius = width / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .append("g") // Add a group element to the svg
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const dataArray = Object.entries(data).map(([property, value]) => ({
      property,
      value,
    }));

    const formattedData = d3.pie().value((d) => d.value)(dataArray);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    let color = null;
    if (!colorMap) {
      color = d3.scaleOrdinal().range(d3.schemeCategory10);
    } else {
      color = d3
        .scaleOrdinal()
        .domain(Object.keys(colorMap))
        .range(Object.values(colorMap));
    }

    // Set up svg data
    svg
      .selectAll()
      .data(formattedData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.value))
      .style("opacity", 0.7)
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
          .text(`${d.data.property}: ${data[d.data.property]}`);
      })
      .on("mouseout", function (event, d) {
        // hide tooltip on mouseout
        svg.select("#tooltip").remove();
      });

    // Create legend
    const legendWidth = 200;
    const legendHeight = 40 * formattedData.length;
    const legendX = width - legendWidth;
    const legendY = height / 2 - legendHeight / 2;
    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    // Create legend color boxes
    legend
      .selectAll()
      .data(formattedData)
      .join("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 40)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d) => color(d.value));

    // Create legend text
    legend
      .selectAll()
      .data(formattedData)
      .join("text")
      .attr("x", 35)
      .attr("y", (d, i) => i * 40 + 15)
      .text((d) => d.data.property);
  }, [data]);

  return (
    <div>
      <svg className="svg-graph" ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
