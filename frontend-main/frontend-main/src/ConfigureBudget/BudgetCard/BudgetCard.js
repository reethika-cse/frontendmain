import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { call } from "../../Services/call";


const BudgetCard = (props) => {

  const { catagory: { allocatedAmount, name, spend, _id}, budgetsData, deleteCategory } = props;

  const handleCategoryRemove = async () => {
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      await call(deleteCategory, _id);
    }
  };


  return (
    <Card sx={{
      maxidth: '345px',
      margin: '20px',
    }} >
      <CardHeader title={`${name}`}></CardHeader>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Alocated amount: <span style={{ color: "blue" }}>
            ${allocatedAmount}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Delete Category">
          <IconButton onClick={() => { handleCategoryRemove() }} size="small"><DeleteIcon /></IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BudgetCard;