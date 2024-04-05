import { ResponsivePie } from '@nivo/pie'

const styles = {
    // overlay: {
    //   position: "absolute",
    //   top: 0,
    //   bottom: 0,
    //   right: 0,
    //   left: 0,
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   fontSize: 17,
    //   color: "#000000",
    //   // background: "#FFFFFF33",
    //   textAlign: "center",
    //   // This is important to preserve the chart interactivity
    //   pointerEvents: "none"
    // },
  };

const data = [
    {
      "id": "Drink",
      "label": "Drink",
      "value": 461,
      "color": "hsl(185, 70%, 50%)"
    },
    {
      "id": "Food",
      "label": "Food",
      "value": 247,
      "color": "hsl(156, 70%, 50%)"
    },
    {
      "id": "Other",
      "label": "Other",
      "value": 568,
      "color": "hsl(359, 70%, 50%)"
    },
]

const CircleChart = ({data}) => (
    <>
    <ResponsivePie
    data={data}
    margin={{ top: 40, right: 85, bottom: 70, left: 85 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "nivo" }}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 70,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
    />
    {/* <div style={styles.overlay}>
      <span>12.875 $</span>
    </div> */}
    </>
)
export default CircleChart;
