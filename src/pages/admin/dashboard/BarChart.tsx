// BarChart.tsx

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  interview: number;
  consultation: number;
  sharing: number;
}

const BarChart: React.FC<BarChartProps> = ({
  interview,
  consultation,
  sharing,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const data = [
      { name: "Interviews", count: interview, color: "#06d6a0" },
      { name: "Consultations", count: consultation, color: "#8d99ae" },
      { name: "Sharing Experiance", count: sharing, color: "#ef476f" },
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 20 };
    const width = 450 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.5) // Add inner padding
      .paddingOuter(0.5); // Add outer padding
    const y = d3.scaleLinear().range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.count)!]);
    const maxY = d3.max(data, d => d.count);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).tickValues(d3.range(0, maxY!, 1))); // Here we set the tick values

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name)!)
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("fill", d => d.color);
  }, [interview, sharing, consultation]);

  return <svg width="450" height="250" ref={ref} />;
};

export default BarChart;
