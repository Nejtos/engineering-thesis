import { ResponsiveLine } from "@nivo/line";

// const data = [
//   {
//     id: "norway",
//     color: "hsl(54, 70%, 50%)",
//     data: [
//       {
//         x: "8.00 am",
//         y: 143,
//       },
//       {
//         x: "10.00 am",
//         y: 168,
//       },
//       {
//         x: "12.00",
//         y: 216,
//       },
//       {
//         x: "2:00 pm",
//         y: 241,
//       },
//       {
//         x: "4:00 pm",
//         y: 241,
//       },
//       {
//         x: "6.00 pm",
//         y: 287,
//       },
//       {
//         x: "8.00 pm",
//         y: 126,
//       },
//     ],
//   },
// ];

const MonthlySalesLineChart = ({ income }) => {
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
        legend: "Day",
        legendPosition: "middle",
        legendOffset: 38,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quantity",
        legendOffset: -40,
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
export default MonthlySalesLineChart;
