import { createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#5c67a3',
      main: '#BD812E',
      dark: '#fff',
      contrastText: '#2E3440',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#fff',
    },
    openTitle: '#2E3440',
    protectedTitle: pink['400'],
    type: 'light',
  },
});

export default theme;
