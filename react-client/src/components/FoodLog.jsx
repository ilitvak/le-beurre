import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class FoodLog extends React.Component {
  constructor(props){
    super(props);
    console.log("User food log inside FoodLog: ", props);
    this.state = {
    
    }
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
            {this.props.userFoodLog.length > 0 ? <Paper className='table-container'>
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
                  {this.props.userFoodLog.map((item, i) => {
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
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell numeric>{Math.round(this.props.userFoodLog.reduce((acc, curr) => {
                      return acc + curr.nf_calories;
                    }, 0))}</TableCell>
                    <TableCell numeric>{Math.round(this.props.userFoodLog.reduce((acc, curr) => {
                      return acc + curr.nf_total_fat;
                    }, 0))}</TableCell>
                    <TableCell numeric>{Math.round(this.props.userFoodLog.reduce((acc, curr) => {
                      return acc + curr.nf_total_carbohydrate;
                    }, 0))}</TableCell>
                    <TableCell numeric>{Math.round(this.props.userFoodLog.reduce((acc, curr) => {
                      return acc + curr.nf_protein;
                    }, 0))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default FoodLog;