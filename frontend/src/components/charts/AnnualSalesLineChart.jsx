import { ResponsiveLine } from "@nivo/line";

const AnnualSalesLineChart = ({ income }) => {
  const data = [
    {
      id: "norway",
      color: "hsl(54, 70%, 50%)",
      data: income,
    },
  ];
  return (
    <ResponsiveLine
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: 14,
            },
          },
        },
      }}
      data={data}
      margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 35,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quantity",
        legendOffset: -44,
        legendPosition: "middle",
      }}
      pointSize={6}
      pointColor="#000000"
      pointBorderColor="#000000"
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};
export default AnnualSalesLineChart;
