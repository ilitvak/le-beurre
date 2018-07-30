import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      enteredBothUserNameAndPassword: false
    }
    this.grabUsername = this.grabUsername.bind(this);
    this.grabPassword = this.grabPassword.bind(this);
    this.accountCreation = this.accountCreation.bind(this);
  }

  grabUsername(user){
    this.setState({
      username: user
    })
  }

  grabPassword(pass){
    this.setState({
      password: pass
    })
  }

  accountCreation(){
    if(this.state.username === '' || this.state.password === ''){
      this.setState({
        enteredBothUserNameAndPassword: false
      })
    } else {
      this.setState({
        enteredBothUserNameAndPassword: true
      })
    }
  }

  render(){
    return(
     <div className={"login-container " + (this.props.toggleFailedLoginAnimation ? 'invalid-login' : '')}>
        <form action="">
          <div className='title'>
            <h3>Le Beurre</h3>
            <span>
              <i className="fas fa-utensils"></i>
            </span>
          </div>
          <h4>Storing daily meals has never been easier.</h4>
          <div className='login-area'>
            <div className='username'>
              <span>
                <i className="fas fa-user-circle"></i>
              </span>
              <TextField
                onChange={(e) => this.grabUsername(e.target.value)}
                id="with-placeholder"
                label="create username"
                placeholder="create username"
                className='textField'
                autoComplete='off'
                required
              />
            </div>
            <div className='password'>
              <span>
                  <i className="fas fa-user-circle"></i>
              </span>
              <TextField
                onChange={(e) => this.grabPassword(e.target.value)}
                id="password"
                label="create password"
                placeholder="create password"
                type="password"
                autoComplete="current-password"
                className='textField'
                required
              />
            </div>
            <div className='login-btn-container'>
              <Button 
                onClick={(e) => this.props.clickedSignUp(e, this.state.username, this.state.password, this.props.history, this.state.enteredBothUserNameAndPassword)}
                variant="contained" 
                color="primary" 
                className='login-btn'>
                create account
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup);