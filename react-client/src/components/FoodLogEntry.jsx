import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

class FoodLogEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      foodJournal: []
    }
    this.searchUserQuery = this.searchUserQuery.bind(this);
    this.usersInput = this.usersInput.bind(this);
  }

  usersInput(query){
    this.setState({
      input: query
    })
  }

  searchUserQuery(e){
    e.preventDefault();
    console.log('send api for users input: ', this.state.input);

    axios.post('/userQuery', {
      userInput: this.state.input
    })
    .then((res) => {
      console.log('Success: sending response from server: ', res.data);
    })
    .catch((res) => {
      console.log('ERROR: sending user input to server: ', res);
    })

    // supposed to clear input field, but doesnt.
    this.setState({
      input: ''
    })
  }

  render(){
    return(
      <div className='parentContainer'>
        <div className='dashboard-container'>
          <div className='title'>
            <Link to='/dashboard'>
              <i className="fas fa-arrow-left go-back"></i>
            </Link>
            <h3>Food Log Entry</h3>
          </div>
          <div className='userInput-mainContainer'>
            <div className='userInput'>
              <input 
                onChange={(e) => this.usersInput(e.target.value)}
                type="text" 
                placeholder='search food'/>
            </div>
            <div className='search-btn'>
              <Link to='/'>
                <Button 
                  onClick={(e) => this.searchUserQuery(e)}
                  variant="fab" 
                  color="primary" 
                  aria-label="Add" 
                  className='add-new-log-btn'>
                  <AddIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className='dashboard-container searched-items'>
          <div className='title'>
            <Link to='/dashboard'>
              <i className="fas fa-arrow-left go-back"></i>
            </Link>
            <h3>Searched Items</h3>
          </div>
          <div className='userInput-mainContainer'></div>
        </div>
      </div>
    )
  }
}

export default FoodLogEntry;