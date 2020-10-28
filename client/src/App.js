import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
