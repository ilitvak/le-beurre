import React from 'react';
import Avatar from '@material-ui/core/Avatar';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      changeDailyGoal: 0,
      changeWeeklyGoal: 0
    }
  }

  render(){
    return(
      <div className='dashboard-container'>
        <div className='title'>
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
            <p>{`2000 Calories`}</p>
          </div>
          <div className='weekly-goals'>
            <h4>Weekly Goals</h4>
            <p>{`Lose 3lbs`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;