import { ResponsiveBar } from "@nivo/bar";

const HorizontalBarChart = ({ income }) => {
  const Title = ({ width }) => {
    const style = {fontSize: "15px"}

    return (
        <text 
            x={width / 4}
            y={-5}
            style={style}

        >
            Overall income and expenses
        </text>
    )
}
  const data = [
    {
      day: "Income",
      Income: income,
      IncomeColor: "hsl(130, 70%, 50%)",
    },
    {
      day: "Expenses",
      Expenses: (0.51*income).toFixed(2),
      ExpensesColor: "hsl(134, 70%, 50%)",
    },
  ];
  return (
    <ResponsiveBar
      data={data}
      layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations', Title]}
      keys={["Income", "Expenses"]}
      indexBy="day"
      margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: false }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      enableGridX={true}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: 5,
      }}
      //   axisLeft={{
      //       tickSize: 5,
      //       tickPadding: 5,
      //       tickRotation: 0,
      //       legend: 'Quantity',
      //       legendPosition: 'middle',
      //       legendOffset: -70
      //   }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
    />
  );
};
export default HorizontalBarChart;
