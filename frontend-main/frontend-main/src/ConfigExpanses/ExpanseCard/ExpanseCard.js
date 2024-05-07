import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { call } from '../../Services/call';

const ExpanseCard = (props) => {
  const { expanse: {selectedCategory, date, description, amountSpent, _id}, deleteExpense }  = props;
  const handleExpenseDelete = async (_id) => {
    await call(deleteExpense, _id);
  };
  return (<>
    <Card sx={{ width: 345 }}>
      <CardHeader title={selectedCategory}/>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Date: <span>{date.substring(0,10)}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amount Spent: <span>{amountSpent}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: <span>{description}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleExpenseDelete(_id)} size="small"><DeleteIcon /></IconButton>
      </CardActions>
    </Card>
  </>)
};

export default ExpanseCard;