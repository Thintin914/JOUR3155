import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export function LabourForce(props: {width: number}) {

  return (
    <BarChart
      width={props.width}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[0, 2000000]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="Female" stackId="a" fill="#EC81C8" />
      <Bar dataKey="Male" stackId="a" fill="#81DFEC" />
    </BarChart>
  );
}
