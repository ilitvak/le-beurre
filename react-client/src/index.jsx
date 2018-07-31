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
      userInDatabase: null
    }
    this.clickedLoginBtn = this.clickedLoginBtn.bind(this);
    this.clickedLogoutBtn = this.clickedLogoutBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateDailyCalories = this.updateDailyCalories.bind(this);
    this.clickedSignUp = this.clickedSignUp.bind(this);
    this.changeDailyFoodGoal = this.changeDailyFoodGoal.bind(this);
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
    }, () => this.updateDailyCalories())

    history.push('/dashboard');
  }

  // updates user goals in dashboard component
  updateDailyCalories(){

    let update = this.state.userFoodLog.reduce((acc, curr) => {
      return acc + curr.nf_calories;
    }, 0)

    this.setState({
      dailyFoodGoal: Math.round(this.state.dailyFoodGoal - update)
    })
  }


  clickedSignUp(e, username, password, history){
    e.preventDefault();

    if(username === '' || password === ''){
      this.setState({
        isLoggedIn: false,
        toggleFailedLoginAnimation: true,
      })
    }

    // sends username and password to db
    axios.post('/signup', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log(`Success, DB saved new signup: ${username}: `, res);
      this.setState({
        isLoggedIn: true,
        toggleFailedLoginAnimation: false,
        dashboardUser: username
      })
      history.push('/dashboard')
    })
    .catch((res) => {
      console.log(`Error, User exists in DB: `, res);
      this.setState({
        isLoggedIn: false,
        toggleFailedLoginAnimation: true,
        userInDatabase: true
      })
    })
  }

  changeDailyFoodGoal(e, updated){
    e.preventDefault();
    
    this.setState({
      dailyFoodGoal: updated
    })
    console.log('User wants to edit daily food goal');
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
              userInDatabase={this.state.userInDatabase}
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