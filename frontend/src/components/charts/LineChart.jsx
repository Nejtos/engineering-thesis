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

const LineChart = ({income}) => {
  const data = [
    {
      id: "norway",
      color: "hsl(54, 70%, 50%)",
      data: income,
    },
  ];
  return (
    <ResponsiveLine
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
        legend: "Time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Order quantity",
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
export default LineChart;
