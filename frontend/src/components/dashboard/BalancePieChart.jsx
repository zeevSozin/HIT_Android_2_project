import { PieChart, Pie, Cell } from "recharts";

function BalancePieChart({ balance }) {
  const { income, expenses } = balance;
  const data = [
    { name: "Incomes", value: income },
    { name: "Expenses", value: expenses },
  ];
  const colors = ["#47ff37", "#ff3b72"];

  // Custom label function to position labels outside the chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2; // Adjust this multiplier to control the label distance from the chart
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name}: ${data[index].value}`}
      </text>
    );
  };

  return (
    <PieChart width={800} height={600}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        fill="#8884d8"
        label={renderCustomizedLabel}
        outerRadius={150} // Adjust the radius as needed
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default BalancePieChart;
