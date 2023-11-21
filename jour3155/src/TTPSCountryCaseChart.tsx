import { FunctionComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { CustomizedAxisTick } from "./LabourForceChart";

const COLORS = ['#451952', '#662549', '#AE445A', '#F39F5A'];

const data = [
  {
    name: "China",
    Approved_Case: 40699,
  },
  {
    name: "Canada",
    Approved_Case: 489,
  },
  {
    name: "United States",
    Approved_Case: 463,
  },
  {
    name: "Australia",
    Approved_Case: 304,
  },
  {
    name: "Singapore",
    Approved_Case: 176,
  },
  {
    name: "Other",
    Approved_Case: 937,
  }
];

const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
      y + height / 3
    } 
    ${x + width / 2}, ${y - 50}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

const TriangleBar: FunctionComponent<any> = (props: any) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  export const CustomTooltip: FunctionComponent<any> = (props: any) => {

    const { active, payload, label } = props;

    if (active && payload && payload.length) {
      return (
        <div className=" flex flex-col justify-start items-starts rounded-md bg-[#ffffffb7] p-1">

            <p className=" font-bold">{label}</p>

            {
                payload.map((pld: any) => (
                    <div className=" flex justify-start items-center gap-5">
                        <div>
                            Approved Case:
                        </div>
                        <div>{pld.value}</div>
                    </div>
                ))
            }
        </div>
      );
    }
  
    return null;
  };

export default function TTPSCountryCaseChart(props: {width: number}) {

    const w = props.width * (props.width < 786 ? 0.9 : 0.45);

  return (
    <BarChart
        width={w} height={w}
      data={data}
      margin={{
        left: 20,
        bottom: 80
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={props.width > 768 ? 0 : 1}/>
      <YAxis />
      <Bar
        dataKey="Approved_Case"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top", dy: -36 }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
        ))}
      </Bar>
      <Tooltip content={<CustomTooltip />} cursor={false}/>
    </BarChart>
  );
}
