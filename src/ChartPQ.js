import React from 'react';
import { useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {ComposedChart, Line, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default function ChartPQ(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary">電力需要</Typography>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart width={400} height={200} data={props.data} margin={{top:16, right:0, bottom:0, left: 0}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={20} />
          <YAxis type="number" width={30} />

          {/* その日の需要データ */}
          <Line type="monotone"
            dot={false}
            dataKey="demandP"
            stroke={theme.palette.primary.main}
            isAnimationActive={false}/>

          {/* グラデーション定義 */}
          <defs>
            <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.light} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.palette.primary.light} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* 需要実績値 */}
          <Area type="monotone"
            dataKey="actualP"
            stroke={theme.palette.primary.light}
            fill="url(#colorP)"
            isAnimationActive={false}/>

        </ComposedChart>
      </ResponsiveContainer>  
    </React.Fragment>
  );
}
