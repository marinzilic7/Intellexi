import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { datum: '2024-05-01', srednji_tecaj: 7.45 },
  { datum: '2024-05-02', srednji_tecaj: 7.42 },
  { datum: '2024-05-03', srednji_tecaj: 7.48 },
];



function Graph() {
 return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="datum" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="srednji_tecaj" stroke="#8884d8" />
    </LineChart>
  );
}
export default Graph;
