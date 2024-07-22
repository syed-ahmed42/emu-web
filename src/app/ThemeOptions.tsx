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
        default: '#000'
    },
  },
  typography: {
    allVariants: {
      color: "white"
    },
  },
  components: {
    MuiSnackbarContent: {
        styleOverrides: {
            root: {
                backgroundColor: 'black',
                color: 'white'
            }
        }
    }
  }
};

export const myTheme = createTheme(themeOptions);
  