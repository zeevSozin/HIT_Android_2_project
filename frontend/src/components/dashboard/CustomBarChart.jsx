import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data, barA, barB }) => {
  return (
    <ResponsiveContainer
      width="95%"
      height={400}
      style={{ marginBottom: "2em" }}
    >
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="original_title"
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
          tick={{ fill: "#fff6af" }}
        />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: "#121212;", color: "#000" }}
          itemStyle={{ color: "#000" }}
          cursor={{ fill: "#3f3f3f" }}
        />
        <Legend />
        <Bar dataKey={barA.key} fill="#8884d8" name={barA.name} />
        <Bar dataKey={barB.key} fill="#82ca9d" name={barB.name} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
