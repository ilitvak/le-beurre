import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.grabUsername = this.grabUsername.bind(this);
    this.grabPassword = this.grabPassword.bind(this);
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

  render(){
    return(
      <div className='login-container'>
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
                label="username"
                placeholder="username"
                className='textField'
                autoComplete='off'
              />
            </div>
            <div className='password'>
              <span>
                  <i className="fas fa-user-circle"></i>
              </span>
              <TextField
                onChange={(e) => this.grabPassword(e.target.value)}
                id="password"
                label="password"
                placeholder="password"
                type="password"
                autoComplete="current-password"
                className='textField'
              />
            </div>
            <div className='login-btn-container'>
            <Link to='/dashboard'>
              <Button 
                onClick={() => this.props.clickedLoginBtn(this.state.username, this.state.password)}
                variant="contained" 
                color="primary" 
                className='login-btn'>
                login
              </Button>
            </Link>
            </div>
            <div className=''>

            </div>
          </div>
        </form>
      </div>
    ) 
  }
}

export default Login;