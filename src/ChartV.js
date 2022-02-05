import React from 'react';
import { useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {ComposedChart, Line, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default function ChartV(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary">電圧</Typography>
      <ResponsiveContainer width="100%" height={150}>
        <ComposedChart width={400} height={200} data={props.data} margin={{top:16, right:0, bottom:0, left: 0}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={20} />
          <YAxis type="number" domain={[90, 110]} interval={0} width={30} />

          {/* 電圧範囲 */}
          <Area type="monotone"
            dataKey="rangeV"
            stroke={theme.palette.secondary.light}
            fill={theme.palette.secondary.light}
            isAnimationActive={false}/>

          {/* 電圧実績値 */}
          <Line type="monotone"
            dot={false}
            dataKey="actualV"
            stroke={theme.palette.primary.main}
            isAnimationActive={false}/>

        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
