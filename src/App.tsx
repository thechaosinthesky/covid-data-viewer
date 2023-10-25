import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#4bbf74'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="header">
          <h1>Covid Data Viewer</h1>
        </header>

      
        <div className="main">
          <Dashboard />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
