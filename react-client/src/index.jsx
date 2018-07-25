import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../src/components/Nav.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import FoodLog from './components/FoodLog.jsx';
import axios from 'axios';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import FoodLogEntry from './components/FoodLogEntry.jsx';

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
    this.addNewFoodLog = this.addNewFoodLog.bind(this);
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

  addNewFoodLog(e){
    e.preventDefault();
    // wrap this in a link tag 
    console.log('Add new food log clicked!');
  }

  render () {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          {this.state.isLoggedIn ? <Nav clickedLogoutBtn={this.clickedLogoutBtn}/> : ''}
          <Route path='/' exact component={() => <Login clickedLoginBtn={this.clickedLoginBtn}/>} />
          <Route path='/foodlogentry' component={() => <FoodLogEntry />} />
          <Route path='/dashboard' component={ () => <Dashboard 
            addNewFoodLog={this.addNewFoodLog}
            consecutiveCheckIns={this.state.consecutiveCheckIns}/> } />
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
    <App />, document.getElementById('app')
);