import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../src/components/Nav.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import FoodLogEntry from './components/FoodLogEntry.jsx';
import axios from 'axios';
import Signup from './components/Signup.jsx';

// import material ui theme for entire application
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#fff',
    },
  }
});

// Check for token and update application state if required

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      toggleFailedLoginAnimation: false,
      consecutiveCheckIns: 0,
      userFoodLog: [],
      redirect: false,
      dailyFoodGoal: 2000,
      signup: false,
      dashboardUser: '',
    }
    this.clickedLoginBtn = this.clickedLoginBtn.bind(this);
    this.clickedLogoutBtn = this.clickedLogoutBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateDailyGoal = this.updateDailyGoal.bind(this);
    this.clickedSignUp = this.clickedSignUp.bind(this);
  }

  clickedLoginBtn(e, username, password, history){
    e.preventDefault();

    if(username === '' || password === ''){
      this.setState({
        toggleFailedLoginAnimation: true
      })
    } 

    else {
      // sends username and password to db
      axios.post('/userlogin', {
        username: username,
        password: password
      })
      .then((res) => {
        console.log('Success, the server recieved your username / password: ', res);
      })
      .catch((res) => {
        console.log(`Error server didn't recieve a username / password: `, res);
      })

      this.setState({
        isLoggedIn: true,
        dashboardUser: username,
        consecutiveCheckIns: ++this.state.consecutiveCheckIns
      })

      // if user successfully logged in, redirect to dashboard
      history.push('/dashboard')
    }
  }

  clickedLogoutBtn(){
    this.setState({
      isLoggedIn: false
    })
  }

  handleSave(e, userFoodLogEntryTable, history){
    e.preventDefault();

    let copyOfUserFoodLog = this.state.userFoodLog.slice();

    copyOfUserFoodLog.push(...userFoodLogEntryTable);

    this.setState({
      userFoodLog: copyOfUserFoodLog
    }, () => this.updateDailyGoal())

    history.push('/dashboard');
  }

  // updates user goals in dashboard component
  updateDailyGoal(){

    console.log('Current userFoodLog Arr: ', this.state.userFoodLog);

    let update = this.state.userFoodLog.reduce((acc, curr) => {
      return acc + curr.nf_calories;
    }, 0)

    this.setState({
      dailyFoodGoal: Math.round(this.state.dailyFoodGoal - update)
    })
  }

  clickedSignUp(e, username, password, history){
    e.preventDefault();

    // sends username and password to db
    axios.post('/signup', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log('Success, the DB saved new signup: ', res);
    })
    .catch((res) => {
      console.log(`Error, the db didn't save new signup: `, res);
    })

    if(username === '' || password === ''){
      this.setState({
        isLoggedIn: false,
        toggleFailedLoginAnimation: true
      })
    } else {
      this.setState({
        isLoggedIn: true,
        dashboardUser: username
      })

      history.push('/dashboard')
    }
  }


  render () {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          {this.state.isLoggedIn ? <Nav clickedLogoutBtn={this.clickedLogoutBtn}/> : ''}
          <Route path='/' exact component={() => 
            <Login
              toggleFailedLoginAnimation={this.state.toggleFailedLoginAnimation} 
              clickedLoginBtn={this.clickedLoginBtn}
            />} 
          />
          <Route path='/signup' component={() => 
            <Signup
              toggleFailedLoginAnimation={this.state.toggleFailedLoginAnimation} 
              clickedSignUp={this.clickedSignUp} 
            />} 
          />
          <Route path='/foodlogentry' component={() => <FoodLogEntry handleSave={this.handleSave}/>} />
          <Route path='/dashboard' component={() => { 
            return ( 
              <Dashboard
                username={this.state.dashboardUser}
                changeDailyFoodGoal={this.changeDailyFoodGoal}
                dailyFoodGoal={this.state.dailyFoodGoal}
                userFoodLog={this.state.userFoodLog}
                consecutiveCheckIns={this.state.consecutiveCheckIns}
              />
            ) 
          }
          } />
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
    <App />, document.getElementById('app')
);