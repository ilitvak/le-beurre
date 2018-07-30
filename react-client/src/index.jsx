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
      consecutiveCheckIns: 0,
      userFoodLog: [],
      redirect: false,
      dailyFoodGoal: 2000
    }
    this.clickedLoginBtn = this.clickedLoginBtn.bind(this);
    this.clickedLogoutBtn = this.clickedLogoutBtn.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateDailyGoal = this.updateDailyGoal.bind(this);
    this.changeDailyFoodGoal = this.changeDailyFoodGoal.bind(this);
  }

  clickedLoginBtn(username, password){
    console.log(`Username: ${username} and Password: ${password}`);
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


  render () {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          {this.state.isLoggedIn ? <Nav clickedLogoutBtn={this.clickedLogoutBtn}/> : ''}
          <Route path='/' exact component={() => 
            <Login 
              clickedLoginBtn={this.clickedLoginBtn}/>} 
          />
          <Route path='/foodlogentry' component={() => <FoodLogEntry handleSave={this.handleSave}/>} />
          <Route path='/dashboard' component={ () => { 
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