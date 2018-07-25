import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

class FoodLog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    // bind here

    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  getCurrentDate(){
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let fullDate = `${month}/${day}/${year}`;
    return fullDate;
  }

  render(){
    return(
      <div className='foodlog-container'>
        <div className='title'>
          <h3>Food Journal</h3>
          <p>{`${this.getCurrentDate()}`}</p>
        </div>

        <div className='food-log-entries'>
          <div className='add-new-log'>
            <Link to='/foodlogentry'>
              <Button 
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
    )
  }
}

export default FoodLog;