import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, DialogActions } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ExpanseDialog.css';
const ExpanseDialog = ({ open, setOpen, catagoryList, addExpense, expansesData, }) => {
  const [description, setDescription] = useState('');
  const [amountSpent, setAmountSpent] = useState(0);
  const [categoryObj, setCategoryObj] = useState({});
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");


  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  };


  const handleExpanses = async () => {
    try {
      console.log(selectedDate);
      const initialDate = new Date(selectedDate);
      const adjustedDate = new Date(initialDate.getTime() - initialDate.getTimezoneOffset() * 60000);
      const formattedDate = adjustedDate.toISOString();
      await addExpense(description, amountSpent, selectedCatId, formattedDate);
      setDescription("")
      setAmountSpent(0)
      setSelectedDate("")
      setCategoryObj({});
    } catch (er) {
      alert("Something went Wrong!!!");
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCatId(category._id);
    setCategoryObj(category);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent className='dialogContent'>
        <TextField
          required
          id="outlined-required"
          label="Description"
          type="text"
          multiline
          maxRows={3}
          placeholder="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth sx={{ margin: '20px 0' }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            value={categoryObj}
            label="Category"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            aria-placeholder='Select Category'
            onChange={(e) => handleCategorySelection(e.target.value)}
          >
            {catagoryList && catagoryList.length > 0 && catagoryList.map((category) => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ margin: "0 0 20px 0" }}
          required
          id="outlined-required"
          label="Amount Spent"
          type="number"
          placeholder="Amount Spent"
          fullWidth
          value={amountSpent}
          onChange={(e) => setAmountSpent(e.target.value)}
        />
        <style>

        </style>
        <div className="container mt-1" style={{ width: '100%' }}>
          <div className="row" style={{ width: '100%' }}>
            <div className="" style={{ padding: '0px', width: '100%' }}>
              <label htmlFor="expenseDate" className="form-label">Expense Date</label>
              <DatePicker
                style={{ width: '100%' }}
                id="expenseDate"
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                className="form-control custom-date-input"
                placeholderText='Select Date'

              />
            </div>
          </div>
        </div>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleExpanses}
          >
            ADD EXPENSE
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
          >
            CLOSE
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ExpanseDialog;


{/* <div className="masterEpansesContainer">
<Navbar title={"Config Expanses"} />
<div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
  <Paper
    className="expansesFormContainer"
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "50%",
      height: '50vh',
      padding: '20px'
    }}
    elevation={3}
  >
    <TextField
      required
      id="outlined-required"
      label="Description"
      type="text"
      multiline
      maxRows={3}
      placeholder="Description"
      sx={{ width: "50vw" }}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <FormControl sx={{ width: "50vw", padding: "0 17px", margin: '20px 0px' }}>
      <InputLabel
        sx={{ paddingLeft: "17px" }}
        id="demo-simple-select-label"
      >
        Catagory
      </InputLabel>
      <Select
        value={categoryObj}
        label="Catagory"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={(e) => handleCategorySelection(e.target.value)}
        inputProps={{ "aria-label": "Without label" }}
      >
        {catagoryList.length > 0 &&
          catagoryList.map((catagory) => {
            return (
              <MenuItem value={catagory}>{catagory.name}</MenuItem>
            );
          })}
      </Select>
    </FormControl>
    <TextField
      required
      id="outlined-required"
      label="Amount Spent"
      type="number"
      placeholder="Amount Spent"
      sx={{ width: "50vw", margin: '10px 0px' }}
      value={amountSpent}
      onChange={(e) => setAmountSpent(e.target.value)}
    />
    <Button
      className="addbuttonCont"
      varient="contained"
      sx={{ backgroundColor: "#424cf9", color: "white" }}
      onClick={() => handleExpanses()}
    >
      ADD EXPENSE
    </Button>
  </Paper>
</div>
<div style={{ display: 'flex', justifyContent: 'end' }}>
  <FormControl
    sx={{
      margin: "10px 20px",
      width: "14%",
      backgroundColor: "#ffffff8f",
      borderRadius: "10px",
    }}
  >
    <InputLabel id="demo-simple-select-label">Catagory Filter</InputLabel>
    <Select
      value={filterCatagoryName}
      label="Catagory"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      onChange={(e) => handleFilter(e)}
      inputProps={{ "aria-label": "Without label" }}
    >
      {catagoryList.map((catagory) => {
        return <MenuItem value={catagory.name}>{catagory.name}</MenuItem>;
      })}
    </Select>
  </FormControl>
</div>
<div className="tableContainerExp">
  {(filterActive ? filterData : expansesData).length <= 0 ? (
    <Paper elevation={3} className="noDataMessageForExp">
      {filterData.length === 0
        ? `No Expanses Present`
        : `Please Enter Some Data!!`}
    </Paper>
  ) : (
    <div className="expanseTable">
      <TableContainer
        sx={{ width: "100%", fontFamily: '"Agbalumo", system-ui' }}
        className="pieChartExpConfigCont"
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650, height: "100%" }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "#12006c !important" }} className="tableHeader">
            <TableRow sx={{ backgroundColor: "rgb(18,0,108) !important" }}>
              <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: '"Agbalumo", system-ui', fontWeight: '700', fontSize: '20px' }}>Catagory</StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: '"Agbalumo", system-ui', fontWeight: '700', fontSize: '20px' }}>Expanses</StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: '"Agbalumo", system-ui', fontWeight: '700', fontSize: '20px' }}>Description</StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: '"Agbalumo", system-ui', fontWeight: '700', fontSize: '20px' }}>Date</StyledTableCell>
              <StyledTableCell sx={{ backgroundColor: '#12006c', fontFamily: '"Agbalumo", system-ui', fontWeight: '700', fontSize: '20px' }}>Remove Expense</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tabelBody">
            {(filterActive ? filterData : expansesData).map((data) => {
              // console.log(data);
              return (
                <StyledTableRow
                // key={data.selectedCatagory}
                >
                  <StyledTableCell sx={{ fontFamily: '"Agbalumo", system-ui' }}>
                    {data.selectedCategory}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontFamily: '"Agbalumo", system-ui' }}>{data.amountSpent}</StyledTableCell>
                  <StyledTableCell sx={{ fontFamily: '"Agbalumo", system-ui' }}>{data.description}</StyledTableCell>
                  <StyledTableCell sx={{ fontFamily: '"Agbalumo", system-ui' }}>
                    {new Date(data.date).toISOString().split("T")[0]}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontFamily: '"Agbalumo", system-ui' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleExpenseDelete(data._id)}>
                      <DeleteIcon style={{ color: 'red' }} />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )}
</div>
</div> */}