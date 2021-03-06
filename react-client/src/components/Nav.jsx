import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div className='parent flex'>
        <AppBar position='static' color='primary' className='app-bar'>
          <Toolbar className='tool-bar'>
            <Typography variant="title" color="inherit" className='flex'>
              Le Beurre
            </Typography>
            <Link to='/'>   
              <Button 
                onClick={this.props.clickedLogoutBtn}
                color="inherit" 
                className='logout-btn'>logout
              </Button>
              </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Nav;