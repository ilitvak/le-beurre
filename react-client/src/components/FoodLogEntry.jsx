import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

class FoodLogEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      searchedFoodArr: [],
      open: false,
      currentFoodSelected: '',
      nutritionInfoArr: [],
      openTable: false
    }
    this.searchUserQuery = this.searchUserQuery.bind(this);
    this.usersInput = this.usersInput.bind(this);
    this.addFoodItem = this.addFoodItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  usersInput(query){
    this.setState({
      input: query
    })
  }

  searchUserQuery(e){
    e.preventDefault();

    if(this.state.input === ''){

    } else {
      axios.post('/userQuery', {
        userInput: this.state.input
      })
      .then((res) => {
        this.setState({
          searchedFoodArr: res.data.branded
        })
        console.log('Success: sending response from server: ', res.data.branded);
      })
      .catch((res) => {
        console.log('ERROR: sending user input to server: ', res);
      })
    }
  }

  addFoodItem(foodSelected, foodID){
    let copyOfSelectedArr = this.state.nutritionInfoArr.slice();

    this.setState({
      open: true,
      currentFoodSelected: foodSelected,
      openTable: true
    })

    axios.post('/nutritionInfo', {
      foodID: foodID
    })
    .then((res) => {
      copyOfSelectedArr.push(res.data.foods[0]);
      this.setState({
        nutritionInfoArr: copyOfSelectedArr
      }, () => console.log('Nutrition Info Arr: ', this.state.nutritionInfoArr))
      console.log('Success: sending data back to client from server: ', res.data.foods);
    })
    .catch((res)=>{
      console.log('ERROR: sending data back to client: ', res);
    })
  }

  handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      open: false 
    });
  };

  render(){
    return(
      <div className='parentContainer'>
        <div className='dashboard-container food-search-container'>
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
          <div className='selectedFoodItemContainer'>
          {this.state.nutritionInfoArr.length > 0 ? <Paper className='table-container'>
            <Table className='table'>
              <TableHead>
                <TableRow>
                  <TableCell>Nutrition</TableCell>
                  <TableCell numeric>Calories</TableCell>
                  <TableCell numeric>Fat (g)</TableCell>
                  <TableCell numeric>Carbs (g)</TableCell>
                  <TableCell numeric>Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.nutritionInfoArr.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.food_name}
                      </TableCell>
                      <TableCell numeric>{item.nf_calories}</TableCell>
                      <TableCell numeric>{item.nf_total_fat}</TableCell>
                      <TableCell numeric>{item.nf_total_carbohydrate}</TableCell>
                      <TableCell numeric>{item.nf_protein}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper> : null}
          </div>
        </div>

        <div className='dashboard-container searched-items'>
          <div className='title'>
            <Link to='/dashboard'>
              <i className="fas fa-arrow-left go-back"></i>
            </Link>
            <h3>Searched Items</h3>
          </div>
          <div className='list-items'>
            <ul>
              {this.state.searchedFoodArr.map((food, i) => {
              return (
                <div key={i}>
                  <li>{food.food_name}</li>
                  <Icon 
                    onClick={() => this.addFoodItem(food.food_name, food.nix_item_id)}
                    className='add-food' 
                    color="primary">
                    add_circle
                  </Icon>
                </div>
                )
              })}
            </ul>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">Added: {this.state.currentFoodSelected}</span>
          }
          action={[
            <Button key="close" color="secondary" size="small" onClick={this.handleClose}>
              close
            </Button>,
          ]}
        />
      </div>
    )
  }
}

export default FoodLogEntry;