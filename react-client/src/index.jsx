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
      signup: false
    }
    this.clickedLoginBtn = this.clickedLoginBtn.bind(this);
    this.clickedLogoutBtn = this.clickedLogoutBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateDailyGoal = this.updateDailyGoal.bind(this);
    this.changeDailyFoodGoal = this.changeDailyFoodGoal.bind(this);
    this.clickedSignUp = this.clickedSignUp.bind(this);
  }

  clickedLoginBtn(e, username, password){
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
        isLoggedIn: !this.state.isLoggedIn,
        consecutiveCheckIns: ++this.state.consecutiveCheckIns
      })
    }
  }

  clickedLogoutBtn(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  handleSave(e, userFoodLogEntryTable, history){
    e.preventDefault();
    this.setState({
      userFoodLog: userFoodLogEntryTable,
    }, () => this.updateDailyGoal())

    history.push('/dashboard');
  }

  // updates user goals in dashboard component
  updateDailyGoal(){
    let update = this.state.userFoodLog.reduce((acc, curr) => {
      return acc + curr.nf_calories;
    }, 0)

    this.setState({
      dailyFoodGoal: Math.round(this.state.dailyFoodGoal - update)
    })
  }

  changeDailyFoodGoal(){
    console.log('clicked me to change daily food goal.');
  }

  clickedSignUp(e, username, password, history){
    e.preventDefault();

    if(username === '' || password === ''){
      this.setState({
        isLoggedIn: false
      })
    } else {
      this.setState({
        isLoggedIn: true
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
              clickedSignUp={this.clickedSignUp} 
            />} 
          />
          <Route path='/signup' component={() => 
            <Signup
              clickedSignUp={this.clickedSignUp} 
            />} 
          />
          <Route path='/foodlogentry' component={() => <FoodLogEntry handleSave={this.handleSave}/>} />
          <Route path='/dashboard' component={() => { 
            return ( 
              <Dashboard
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