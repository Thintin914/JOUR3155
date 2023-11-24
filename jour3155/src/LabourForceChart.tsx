import { FunctionComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  {
    name: '2019 Q1',
    Female: 1990800,
    Male: 1994700,
  },
  {
    name: '2019 Q2',
    Female: 2003800,
    Male: 1990100,
  },
  {
    name: '2019 Q3',
    Female: 2005700,
    Male: 1983400,
  },
  {
    name: '2019 Q4',
    Female: 1985600,
    Male: 1986200,
  },
  {
    name: '2020 Q1',
    Female: 1973400,
    Male: 1947400,
  },
  {
    name: '2020 Q2',
    Female: 1967800,
    Male: 1937100,
  },
  {
    name: '2020 Q3',
    Female: 1954800,
    Male: 1950100,
  },
  {
    name: '2020 Q4',
    Female: 1949300,
    Male: 1953500,
  },
  {
    name: '2021 Q1',
    Female: 1955700,
    Male: 1932800,
  },
  {
    name: '2021 Q2',
    Female: 1962000,
    Male: 1923600,
  },
  {
    name: '2021 Q3',
    Female: 1949800,
    Male: 1924200,
  },
  {
    name: '2021 Q4',
    Female: 1935400,
    Male: 1915500,
  },
  {
    name: '2022 Q1',
    Female: 1908600,
    Male: 1884900,
  },
  {
    name: '2022 Q2',
    Female: 1873700,
    Male: 1880600,
  },
  {
    name: '2022 Q3',
    Female: 1906100,
    Male: 1902000,
  },
  {
    name: '2022 Q4',
    Female: 1933900,
    Male: 1913400,
  },
  {
    name: '2023 Q1',
    Female: 1899100,
    Male: 1870100,
  },
  {
    name: '2023 Q2',
    Female: 1913700,
    Male: 1888700,
  },
  {
    name: '2023 Q3',
    Female: 1929700,
    Male: 1904600,
  },
];

const CustomTooltip: FunctionComponent<any> = (props: any) => {

  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className=" flex flex-col justify-start items-starts rounded-md bg-[#ffffffb7] p-1">

          <p className=" font-bold">{label}</p>

          {
              payload.map((pld: any) => (
                  <div className=" flex justify-start items-center gap-5"
                    style={{
                      color: pld.color
                    }}>
                      <div>
                        {pld.dataKey}
                      </div>
                      <div>{pld.value < 0 ? pld.value * -1 : pld.value}</div>
                  </div>
              ))
          }
      </div>
    );
  }

  return null;
};

const DataFormater = (number: number) => {
  return (number/1000000).toString() + 'M';
  // if(number > 1000000000){
  //   return (number/1000000000).toString() + 'B';
  // }else if(number > 1000000){
  //   return (number/1000000).toString() + 'M';
  // }else if(number > 1000){
  //   return (number/1000).toString() + 'K';
  // }else{
  //   return number.toString();
  // }
}

export const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={20}
      >
        {payload.value}
      </text>
    </g>
  );
};

export function LabourForce(props: {width: number}) {

  return (
    <BarChart
      width={props.width}
      barCategoryGap={props.width > 768 ? 10 : 18}
      height={600}
      data={data}
      stackOffset="sign"
      margin={{
        top: 10,
        right: 0,
        left: 20,
        bottom: 20
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={props.width > 768 ? 0 : 1} />
      <YAxis tickFormatter={DataFormater} domain={[0, 5000000]} tickCount={15} interval={1} fontSize={20} />
      <Tooltip content={<CustomTooltip />}  />
      <Legend wrapperStyle={{paddingTop: 25}} />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="Male" fill="#7A87D4" stackId="stack" />
      <Bar dataKey="Female" fill="#D47ABB" stackId="stack" />
    </BarChart>
  );
}
