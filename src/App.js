import React, {useState} from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChartPQ from './ChartPQ';
import ChartV from './ChartV';
import Generator from './Generator';
import { demandTarget, voltageRangeLower, voltageRangeUpper, admitances} from './Data';
import Complex from './Complex';
import { flow, calcYMatrix, flowDemandUnknown } from './Flow';
import './App.css';

const voltageResult = [
  {time: 0, V: 101},
  {time: 1, V: 102},
  {time: 2, V: 101},
  {time: 3, V: 101}
];

const demandResult = [
  {time: 0, P: 6.2420, Q: -0.9484},
  {time: 1, P: 6.0160, Q: -1.0226},
  {time: 2, P: 5.9420, Q: -1.0470},
  {time: 3, P: 5.9280, Q: -1.0516}
]

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

export default function App() {
  const classes = useStyles();
  
  const Vbase = 66000;  // 基準線間電圧[V]
  const Pbase = 100000 * 1000;  // 基準三相電力[W]
  const Y = calcYMatrix(admitances);  // Y行列
  const [genV, setGenV] = useState(new Complex(1.05, 0.2));  // 発電機電圧 [pu]
  const [ssV, setSsV] = useState(new Complex(1.04, 0));    // 変電所2次側電圧 [pu]
  const [demV, setDemV] = useState(new Complex(1.01, 0));  // 需要家電圧 [pu]
  const [genI, setGenI] = useState(new Complex(0, 0));     // 発電機電流 [pu]
  const [demI, setDemI] = useState(new Complex(0, 0));     // 需要電流 [pu]

  // 発電機電圧がドラッグ等で変更された時に、voltages[0]を更新する処理
  const changeGenV = (genV) => {
    setGenV(genV);
    const [I0, V1, I2] = flowDemandUnknown(genV, demV, Y);
    setGenI(I0);
    setSsV(V1);
    setDemI(I2);
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
