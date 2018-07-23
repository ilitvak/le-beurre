import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    // bind methods here
  }

  // use methods here

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
          <div className='login-area'>
            <div className='username'>
              <span>
                <i className="fas fa-user-circle"></i>
              </span>
              <TextField
                id="with-placeholder"
                label="username"
                placeholder="username"
                className='textField'
              />
            </div>
            <div className='password'>
              <span>
                  <i className="fas fa-user-circle"></i>
              </span>
              <TextField
                id="with-placeholder"
                label="password"
                placeholder="password"
                className='textField'
              />
            </div>
            <div className='login-btn-container'>
              <Button variant="contained" color="primary" className='login-btn'>
                login
              </Button>
            </div>
          </div>
        </form>
      </div>
    ) 
  }
}

export default Login;