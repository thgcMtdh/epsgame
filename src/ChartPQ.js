import React from 'react';
import { useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ScatterChart, Legend, CartesianGrid, XAxis, YAxis, ZAxis, ResponsiveContainer, Scatter} from 'recharts';

export default function ChartPQ(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary">電力需要 [万kW]</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart width={400} height={200} margin={{top:16, right:8, bottom:0, left: 0}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="time" height={20} />
          <YAxis type="number" dataKey="P" domain={[0, 12]} width={25} />
          <ZAxis type="number" dataKey="z" range={[20, 100]} />
          <Legend />

          {/* その日の需要データ */}
          <Scatter name="需要"
            data={props.target}
            fill={theme.palette.secondary.main}
            line={{stroke: theme.palette.secondary.main, strokeWidth: 2}} />

          {/* 需要実績値 */}
          <Scatter name="実際に届けた電力"
            data={props.result}
            fill={theme.palette.primary.main}
            line={{stroke: theme.palette.primary.main, strokeWidth: 2}}
            isAnimationActive={false} />

        </ScatterChart>
      </ResponsiveContainer>  
    </React.Fragment>
  );
}
