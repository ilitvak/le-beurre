import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../src/components/Nav.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Login from './components/Login.jsx';

// import material ui theme for entire application
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#fff',
    },
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false
    }
  }

  render () {
    if(this.state.isLoggedIn){
      return (
        <MuiThemeProvider theme={theme}>
          <Nav/>
        </MuiThemeProvider>
      )
    } else {
      return (
        <Login />
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));