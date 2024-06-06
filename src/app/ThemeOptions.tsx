import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#a320bf',
    },
    background: {
        default: '#000000'
    },
  },
  typography: {
    allVariants: {
      color: "white"
    },
  }
};

export const myTheme = createTheme(themeOptions);
  