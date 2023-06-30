// PieChart.tsx

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface PieChartProps {
  adminCount: number;
  normalCount: number;
  providers: number;
}

const PieChart: React.FC<PieChartProps> = ({
  adminCount,
  normalCount,
  providers,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const data = [
      { name: "Admin", count: adminCount, color: "#06d6a0" },
      { name: "Normal", count: normalCount, color: "#8d99ae" },
      { name: "Providers", count: providers, color: "#ef476f" },
    ];

    const width = 250;
    const height = 250;
    const radius = Math.min(width, height) / 2;

    svg.attr("width", width).attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<any>().value((d: any) => Number(d.count))(data);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    const arcLabel = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    g.selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", arcGenerator as any)
      .style("fill", (d: any) => d.data.color)
      .style("stroke", "white")
      .style("opacity", 1);

    g.selectAll("text")
      .data(pie)
      .enter()
      .append("text")
      .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 15)
      .text((d: any) => `${d.data.name}: ${d.data.count}`);
  }, [adminCount, normalCount, providers]);

  return <svg ref={ref} />;
};

export default PieChart;
