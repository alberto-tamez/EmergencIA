import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import './fonts.css';
import { DataProvider } from './context'; // Assuming DataContext file is in the same directory

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </DataProvider>

  </React.StrictMode>
);
