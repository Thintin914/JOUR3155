import { useCallback, useState } from "react";
import { Cell, Label, Legend, Pie, PieChart, Sector, Tooltip } from "recharts";

const COLORS = ['#451952', '#AE445A', '#F39F5A'];

const data = [
    { name: "Category A", China: 9872 },
    { name: "Category B", China: 23452 },
    { name: "Category C", China: 9834 },
  ];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <Sector
        className=" pointer-events-none"
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
        className=" pointer-events-none"
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <text x={cx} y={cy} fontSize={50} dy={-80} textAnchor="middle" fill={fill}>
          China
        </text>
        <text x={cx} y={cy} fontSize={50} dy={-32} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <text x={cx} y={cy} fontSize={40} dy={32} textAnchor="middle" fill={fill}>
          {value}  
        </text>
        <text x={cx} y={cy} fontSize={40} dy={64} textAnchor="middle" fill={fill}>
          {`${(percent * 100).toFixed(2)}%`}  
        </text>
      </g>
    );
  };

  export function TTPSPieChart(props: {width: number}){

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_: any, index: any) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const w = props.width * (props.width < 450 ? 0.9 : 0.45);

    return(
        <div className=" w-full h-fit flex justify-center items-center">
            <PieChart width={props.width} height={w}
                margin={{
                    left: w * (props.width < 450 ? 0 : 0.4)
                }}>
                <Pie
                    dataKey="China"
                    isAnimationActive={false}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={w * 0.5}
                    cy={w * 0.5}
                    innerRadius={w * 0.45}
                    outerRadius={w * 0.55}
                    fill="#8884d8"
                    onMouseEnter={onPieEnter}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="top" align="right" fontSize={5} />
            </PieChart>
        </div>
    )
  }