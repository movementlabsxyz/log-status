import { ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
  typography : {
    fontFamily : [
      "Monaco",
      "Consolas",
      "monospace",
    ].join(","),
  },
  palette: {
    primary: {
      main: '#FFD012',
    },
    background: {
      default: '#121212', // Dark background for night mode
      paper: '#1e1e1e',
      
    },
    text: {
      primary: '#ffffff',
      secondary: '#a9a9a9',
    },
  },
  // Add additional theme customizations here
  spacing: 8, // Sets the default padding/margin
};

export default theme;
