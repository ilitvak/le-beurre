import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FoodLog from '../components/FoodLog.jsx';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    console.log('UserFoodLog: ', props);
    this.state = {
      changeWeeklyGoal: 0
    }

  }

  render(){
    return(
      <div className='dashboard-container'>
        <div className='title'>
          <h3>Welcome {this.props.username}</h3>
          <h3>{this.props.consecutiveCheckIns} days logged in</h3>
        </div>
        <div className='user-avatar-container'>
          <div className='avatar-box'>
            <Avatar
              alt="Terminator"
              src=''
              className='avatar bigAvatar'
            />
          </div>
        </div>
        <div className='goals-container'>
          <div className='daily-goals'>
            <h4>Daily Goals</h4>
            <p>{`${this.props.dailyFoodGoal} calories`}</p>
            <Button 
              onClick={(e) => this.props.changeDailyFoodGoal(e)}
              variant="fab" 
              size='small'
              aria-label="Edit" 
              className='edit-btn'>
              <Icon className='icon'>edit_icon</Icon>
            </Button>
          </div>
          <div className='weekly-goals'>
            <h4>Weekly Goals</h4>
            <p>{`Lose 3lbs`}</p>
          </div>
        </div>
        <FoodLog 
          userFoodLog={this.props.userFoodLog} />
      </div>
    );
  }
}

export default Dashboard;