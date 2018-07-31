import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FoodLog from '../components/FoodLog.jsx';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      usersInput: 0
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateUserInput = this.updateUserInput.bind(this);
  }

  updateUserInput(e){
    this.setState({
      usersInput: e.target.value
    })
  }

  handleOpen(){
    this.setState({
      open: true
    })
  }

  handleClose(){
    this.setState({
      open: false
    })
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
              onClick={this.handleOpen}
              variant="fab" 
              size='small'
              aria-label="Edit" 
              className='edit-btn'>
              <Icon className='icon'>edit_icon</Icon>
            </Button>

            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
            <div className='modal-container'>
              <Typography variant="title" id="modal-title">
                Change Daily Calorie Goal
              </Typography>
              <div className='userInput changeDailyCalorieGoal'>
                <input 
                  onChange={(e) => this.updateUserInput(e)}
                  type="number" 
                  placeholder='change daily goal'/>
              </div>
              <div onClick={this.handleClose} className='close-btn-container'>
                <i className="far fa-times-circle"></i>
              </div>

              <div className='user-calorie-submit-container'>
                <Button
                  onClick={(e) => this.props.changeDailyFoodGoal(e, this.state.usersInput)} 
                  variant="fab" 
                  color="primary" 
                  aria-label="Add" 
                  className='add-new-log-btn update-daily-user-calories'>
                  <AddIcon />
                </Button>
              </div>
            </div>
            </Modal>
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