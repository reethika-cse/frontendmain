import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, TextField, Button, DialogTitle, DialogActions, Tooltip } from '@mui/material';
import './BudgetForm.css'; // Import your CSS file
import { call } from '../../Services/call';

const BudgetForm = (props) => {
  const [monthlyBudget, setMonthlyBudget] = useState(10000);
  const [budgetName, setBudgetName] = useState('MonthlyBudget');
  const [catagory, setCatagory] = useState("");
  const [chipData, setChipData] = useState({});
  const [catagoryBudget, setCatagoryBudget] = useState("");
  const [calculatedAmmount, setCalculatedAmmount] = useState(0);
  const [budgetId, setBudgetId] = useState("");

  const {
    open,
    setOpen,
  } = props;


  const {
    getBudgetData,
    addBudgetData,
    budgetsData,
    createCatgory,
    deleteCategory,
  } = props;


  useEffect(() => {
    if (budgetsData != null && Object.keys(budgetsData).length > 0) {
      setBudgetId(budgetsData._id);
      setMonthlyBudget(budgetsData.totalAmount);
      setBudgetName(budgetsData.name);
      const { categories } = budgetsData;

      const transformedObject = categories.reduce((result, item) => {
        result[item.name] = item.allocatedAmount;
        return result;
      }, {});
      setChipData(transformedObject);

      let totalCategoryAmount = 0;
      budgetsData.categories.map((cat) => {
        totalCategoryAmount += cat.allocatedAmount;
      });
      setCalculatedAmmount(totalCategoryAmount);
    }
  }, [budgetsData]);

  const handleChipData = async () => {
    const newChipObject = {
      ...chipData,
      ...{ [catagory]: catagoryBudget },
    };
    setCalculatedAmmount(
      parseInt(calculatedAmmount) + parseInt(catagoryBudget)
    );
    setChipData(newChipObject);
    if (budgetsData && budgetsData.length != 0) {
      await call(createCatgory, catagory, catagoryBudget, budgetId)
    }
    else {
      await call(addBudgetData, budgetName, catagoryBudget, chipData, catagory)
    }
    setCatagoryBudget("");
    setCatagory("");
  };


  const handleDataSubmit = async () => {
    await call(addBudgetData, budgetName, monthlyBudget, chipData)
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Manage your budget
        </DialogTitle>
        <DialogContent>
          {/* <Tooltip title={budgetsData && budgetsData.length != 0 ? "You can reset your budget next month!" : "Submit your budget"}>

            <TextField
              required
              id="outlined-required-monthly-budget"
              label="Monthly Budget Amount"
              type="number"
              placeholder="Monthly Budget Amount"
              fullWidth
              // disabled={budgetsData && budgetsData.length != 0}
              margin="normal"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
            />
          </Tooltip>
          <Tooltip title={budgetsData && budgetsData.length != 0 ? "You can reset your budget next month!" : "Submit your budget"}>
            <TextField
              required
              id="outlined-required-budget-name"
              label="Budget Name"
              placeholder="Budget Name"
              fullWidth
              margin="normal"
              // disabled={budgetsData && budgetsData.length != 0}
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          </Tooltip> */}
          {/* <div className="categoryContainer"> */}
          <TextField
            required
            fullWidth
            id="outlined-required-category"
            label="Category Name"
            placeholder="Category Name"
            // style={{ width: '40%' }}
            // disabled={budgetsData && budgetsData.length === 0}
            margin="normal"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          />
          <TextField
            required
            id="outlined-required-category-budget"
            label="Category Budget Amount"
            type="number"
            fullWidth
            placeholder="Category Budget Amount"
            // style={{ width: '30%' }}
            margin="normal"
            // disabled={budgetsData && budgetsData.length === 0}
            value={catagoryBudget}
            onChange={(e) => setCatagoryBudget(e.target.value)}
          />
          {/* <Button
            variant="outlined"
            style={{ width: '30%' }}
            disabled={budgetsData && budgetsData.length === 0}
            onClick={}
          >
            Add Category
          </Button> */}
          {/* </div> */}
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              disabled={false} // Update with your condition
            >
              CLOSE
            </Button>
            <Tooltip title="Add category">

              <Button
                variant="contained"
                onClick={() => handleChipData()}
              >
                Add Category

              </Button>
            </Tooltip>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetForm;


{/* 
<Paper elevation={4} className="configBudgetFormContainer">
                  <TextField
                    required
                    id="outlined-required"
                    label="Monthly Budget Amount"
                    type="number"
                    placeholder="Monthly Budget Amount"
                    sx={{ width: "100%", margin: "0px 0 10px 0" }}
                    disabled={budgetsData?.totalAmount}
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Budget Name"
                    placeholder={budgetsData?.name ? "" : "Budget Name"}
                    disabled={budgetsData?.name}
                    value={budgetName}
                    sx={{ width: "100%", margin: "10px 0 10px 0" }}
                    onChange={(e) => setBudgetName(e.target.value)}
                  />
                  <div className="catagoryContainer">
                    <TextField
                      required
                      // disabled={budgetsData?.categories}
                      id="outlined-required"
                      label="Budget Catagory"
                      placeholder="Budget Catagory"
                      sx={{ width: "40%" }}
                      // value={}
                      // disabled={Object.keys(budgetsData).length != 0}
                      value={catagory}
                      onChange={(e) => setCatagory(e.target.value)}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Budget Amount"
                      type="number"
                      placeholder={budgetsData?.categories ? "" : "Budget Amount"}
                      value={catagoryBudget}
                      // disabled={budgetsData?.categories}
                      sx={{ width: "30%", borderColor: "#1976d2" }}
                      onChange={(e) => setCatagoryBudget(e.target.value)}
                    />
                    <Button
                      varient="contained"
                      sx={{
                        width: "30%",
                        backgroundColor: "#424cf9",
                        color: "white",
                        fontFamily: ""Agbalumo", system-ui",
                      }}
                      className="addIcon"
                      title="Add Catagory"
                      onClick={() => handleChipData()}
                    >
                      ADD CATAGORY
                    </Button>
                  </div>
                  <div
                    className="addBudgetButton"
                    title="Create Budget"
                    onClick={() => {
                      if (
                        budgetsData === null ||
                        budgetsData?.length === 0 ||
                        Object.keys(budgetsData).length === 0
                      )
                        handleDataSubmit();
                    }}
                  >
                    <Button
                      variant="contained"
                      disabled={budgetsData?.categories}
                      sx={{ backgroundColor: "#fa6166" }}
                    >
                      Submit
                    </Button>
                  </div>
                </Paper>









<div className="formDetailsContainer">
                
                <div className="monthlyBudgetContainer">
                  <Paper className="monthlyAmountContainer" elevation={2}>
                    <span className="monthlyHeader">
                      Calculated Budget Vs Monthly Budget
                    </span>
                    <div className="fractionContainerAmount">
                      <span className="calculateAmount">{calculatedAmmount}</span>/
                      {monthlyBudget}
                    </div>
                  </Paper>
                </div>
              </div>

<TableContainer
sx={{ width: "100vw", fontFamily: ""Agbalumo", system-ui" }}
className="pieChartConfigCont"
component={Paper}
>
<Table
  sx={{ minWidth: 650, height: "100%", width: '100vw' }}
  aria-label="simple table"
>
  <TableHead className="tableHeader" style={{ width: '100vw' }}>
    <TableRow sx={{ backgroundColor: "#12006c" }}>
      <StyledTableCell sx={{ paddingLeft: "100px" }} align="left">
        Catagory Name
      </StyledTableCell>
      <StyledTableCell sx={{ paddingRight: "50px" }} align="center">
        Budget Amount
      </StyledTableCell>
      <StyledTableCell sx={{ paddingRight: "50px" }} align="center">
        Actions
      </StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody className="tabelBody">
    {Object.keys(chipData).length <= 0 ? (
      <div className="noDataMessage">Please Enter Some Data!!</div>
    ) : (
      Object.entries(chipData).map(([key, value], index) => (
        <StyledTableRow
          key={key}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell
            sx={{ paddingLeft: "100px" }}
            align="left"
            component="th"
            scope="row"
          >
            {key}
          </StyledTableCell>
          <StyledTableCell
            sx={{ paddingRight: "50px" }}
            align="center"
          >
            {value}
          </StyledTableCell>
          <StyledTableCell
            sx={{ paddingRight: "50px" }}
            align="center"
          >
            <span onClick={() => handleCategoryDelete(index)}>
              <DeleteIcon style={{ color: 'red' }} />
            </span>
          </StyledTableCell>
        </StyledTableRow>
      ))
    )}
  </TableBody>
</Table>
</TableContainer> */}