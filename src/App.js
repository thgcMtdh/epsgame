import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import ChartPQ from './ChartPQ';
import ChartV from './ChartV';
import './App.css';

const demandData = [
  {time: 0, demandP: 100, actualP: 90, demandQ: 20},
  {time: 1, demandP: 110, actualP: 100, demandQ: 20},
  {time: 2, demandP: 130, actualP: 120, demandQ: 25},
  {time: 3, demandP: 135, actualP: 125, demandQ: 26},
  {time: 4},
  {time: 5},
  {time: 6},
  {time: 7}
];

const voltageData = [
  {time: 0, rangeV: [95, 107], actualV: 102},
  {time: 1, rangeV: [95, 107], actualV: 103},
  {time: 2, rangeV: [95, 107], actualV: 102},
  {time: 3, rangeV: [95, 107], actualV: 102},
  {time: 4, rangeV: [95, 107]},
  {time: 5, rangeV: [95, 107]},
  {time: 6, rangeV: [95, 107]},
  {time: 7, rangeV: [95, 107]}
];

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
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.fixedHeightPaper}>
                <ChartPQ data={demandData}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.fixedHeightPaper}>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.fixedHeightPaper}>
                <ChartV data={voltageData}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.fixedHeightPaper}>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.fixedHeightPaper}>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
