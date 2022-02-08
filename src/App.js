import React, { useState, useEffect } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { dotDivide, dotMultiply, matrix, ones } from 'mathjs';
import ChartPQ from './ChartPQ';
import ChartV from './ChartV';
import Generator from './Generator';
import { demandTarget, voltageRangeLower, voltageRangeUpper, defaultAdmitancesRe, defaultAdmitancesIm } from './Data';
import { flow, calcYMatrix, flowDemandUnknown } from './Flow';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#db5858',
      main: '#d32f2f',
      dark: '#932020',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffac33',
      main: '#ff9800',
      dark: '#b26a00',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      "Noto Sans JP"
    ],
    button: {
      textTransform: "none"
    }
}
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const sqrt3 = Math.sqrt(3);

export default function App() {
  const classes = useStyles();
  
  const Vbase = 154000;  // 基準線間電圧[V]
  const Pbase = 100000 * 1000;  // 基準三相電力[W]
  const [admitances, setAdmitances] = useState({re: dotDivide(defaultAdmitancesRe, 2), im: dotDivide(defaultAdmitancesIm, 2)});  // 系統各部のアドミタンス[pu]
  const [time, setTime] = useState(3);  // 現在時刻[h]
  const [genV, setGenV] = useState([1.05, 0]);  // 発電機電圧 [pu]
  const [ssV, setSsV] = useState([1.04, 0]);    // 変電所2次側電圧 [pu]
  const [demV, setDemV] = useState([1.01, 0]);  // 需要家電圧 [pu]
  const [genI, setGenI] = useState([0, 0]);     // 発電機電流 [pu]
  const [ssI, setSSI] = useState([0, 0]);       // 変電所電流[pu]
  const [demI, setDemI] = useState([0, 0]);     // 需要電流 [pu]

  const [voltageResult, setVoltageResult] = useState([  // 需要家端で測定した電圧実績
    {time: 0, V: 101},
    {time: 1, V: 102},
    {time: 2, V: 101},
    {time: 3, V: 101}
  ]);
  const [demandResult, setDemandResult] = useState([  // 実際に届けた電力実績
    {time: 0, P: 6.2420, Q: -0.9484},
    {time: 1, P: 6.0160, Q: -1.0226},
    {time: 2, P: 5.9420, Q: -1.0470},
    {time: 3, P: 5.9280, Q: -1.0516}
  ]);

  // アドミタンスが更新されたときに限りY行列の再計算を実行
  useEffect(() => {
    calcYMatrix(admitances.re, admitances.im);  // Y行列
    console.log('admitance calculated');
  }, [admitances]);

  // 発電機電圧がドラッグ等で変更された時に、各種の値を更新する処理
  const changeGenV = (genV) => {
    setGenV(genV);
    const [I0, V1, I2] = flowDemandUnknown(genV, ssI, demV);
    setGenI(dotDivide(I0, sqrt3));
    setSsV(V1);
    setDemI(dotDivide(I2, sqrt3));
    const S = [ // 電力=V*conj(I)
      sqrt3 * (demV[0]*demI[0] + demV[1]*demI[1]),
      sqrt3 * (demV[1]*demI[0] - demV[0]*demI[1])
    ];
    setDemandResult(() => {
      let newDemandResult = demandResult;
      newDemandResult[3].P = - S[0] * Pbase * 1e-7;
      newDemandResult[3].Q = - S[1] * Pbase * 1e-7;
      return newDemandResult;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ChartPQ target={demandTarget} result={demandResult}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <ChartV rangeLower={voltageRangeLower} rangeUpper={voltageRangeUpper} result={voltageResult}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Generator genV={genV} demV={demV} genI={genI} demI={demI} onChange={changeGenV}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
