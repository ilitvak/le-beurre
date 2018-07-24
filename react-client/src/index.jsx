import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../src/components/Nav.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

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
      isLoggedIn: false,
      consecutiveCheckIns: 0
    }
    this.clickedLoginBtn = this.clickedLoginBtn.bind(this);
    this.clickedLogoutBtn = this.clickedLogoutBtn.bind(this);
  }

  clickedLoginBtn(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      consecutiveCheckIns: ++this.state.consecutiveCheckIns
    })
  }

  clickedLogoutBtn(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }


  render () {
    if(this.state.isLoggedIn){
      return (
        <MuiThemeProvider theme={theme}>
          <Nav clickedLogoutBtn={this.clickedLogoutBtn}/>
          <Dashboard consecutiveCheckIns={this.state.consecutiveCheckIns} />
        </MuiThemeProvider>
      )
    } else {
      return (
        <Login clickedLoginBtn={this.clickedLoginBtn}/>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));