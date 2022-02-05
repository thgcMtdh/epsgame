import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChartPQ from './ChartPQ';
import ChartV from './ChartV';
import Generator from './Generator';
import { demandTarget, voltageRangeLower, voltageRangeUpper} from './Data';
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
                <Generator />
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
