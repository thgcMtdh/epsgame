import React from 'react';
import { useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ScatterChart, Legend, CartesianGrid, XAxis, YAxis, ZAxis, ResponsiveContainer, Scatter} from 'recharts';

export default function ChartV(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary">電圧</Typography>
      <ResponsiveContainer width="100%" height={100}>
      <ScatterChart width={400} height={200} margin={{top:16, right:8, bottom:0, left: 0}}>
          <XAxis type="number" dataKey="time" height={1} />
          <YAxis type="number" dataKey="V" domain={[90, 110]} width={1} />
          <ZAxis type="number" dataKey="z" range={[0, 100]} />

          {/* 電圧範囲 */}
          <Scatter name="下限"
            data={props.rangeLower}
            fill={theme.palette.secondary.main}
            line={{stroke: theme.palette.secondary.main, strokeWidth: 1}} />

          <Scatter name="上限"
            data={props.rangeUpper}
            fill={theme.palette.secondary.main}
            line={{stroke: theme.palette.secondary.main, strokeWidth: 1}} />

          {/* 実績値 */}
          <Scatter name="電圧実績"
            data={props.result}
            fill={theme.palette.primary.main}
            line={{stroke: theme.palette.primary.main, strokeWidth: 2}} />

        </ScatterChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
