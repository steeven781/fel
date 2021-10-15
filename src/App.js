
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';
import { ToastContainer, toast } from 'react-toastify';


 

function App() {

  const theme = createTheme(
    {
      palette: {
        mode: 'dark',
        common: {
          black: "#000",
          white: "#fff"
        },
        primary: {
          main: "#90caf9",
          light: "#e3f2fd",
          dark: "#42a5f5",
          contrastText: "#fff"
        }
      }
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes />
          <ToastContainer/>
        </BrowserRouter>
      </div>
    </ThemeProvider>

  );
}

export default App;
