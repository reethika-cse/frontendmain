import React, { useEffect, useState } from "react";
import "./ConfigExpanses.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Navbar from "../Navbar";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpanseDialog from "./ExpanseDialog";
import ExpanseCard from "./ExpanseCard";
import { Tooltip } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#424bf995",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    color: 'black'

  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#12006c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'black'
  },
}));

const today = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  day: "numeric",
  month: "short",
  year: "numeric",
};

const ConfigExpanses = (props) => {
  // debugger
  const [description, setDescription] = useState("");
  const [amountSpent, setAmountSpent] = useState(0);
  const [expansesData, setExpansesData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState("");

  const [filterCatagoryName, setFilterCatagoryName] = useState("All");
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const [catagoryList, setCatagoryList] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [openDialog, setOpenDialog] = useState(false);


  const date = today.toLocaleString("en-US", options);

  const {
    budgetsData,
    getBudgetData,
    addExpense,
    getExpenses,
    expensesData,
    deleteExpense,
  } = props;

  useEffect(() => {
    console.log("-----------", expensesData);
    if (expensesData.length > 0) {
      const newArray = expensesData.map((item) => ({
        amountSpent: item.amount,
        date: item.date,
        description: item.description,
        _id: item._id,
        selectedCategory: item.categoryName,
      }));
      setExpansesData(newArray);
    }
  }, [expensesData]);
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        await getBudgetData();
        await getExpenses(selectedCatId);
      } catch (er) {
        alert("Something went Wrong", er.message);
      }
    };
    fetchBudgetData();
  }, []);

  useEffect(() => {
    // console.log('=========',budgetsData)
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      setCatagoryList(budgetsData.categories);
    }
    // console.log(catagoryList)
  }, [budgetsData]);

  const handleExpanses = async () => {
    try {
      await addExpense(description, amountSpent, selectedCatId, selectedDate);
      const newData = [
        {
          amountSpent,
          description,
          selectedCatagory,
          date,
        },
      ];
      const newObj = [...expansesData, ...newData];
      setFilterActive(false);
      setExpansesData(newObj);
      setCategoryObj({});
      setAmountSpent("");
      setDescription("");
    } catch (er) {
      alert("Something went Wrong!!!");
    }
  };

  const handleFilter = (e) => {
    setFilterCatagoryName(e.target.value);
    if (e.target.value === "All") {
      setFilterActive(false);
      setFilterData(expansesData);
    } else {
      let filteredArray;
      setFilterActive(true);
      filteredArray = expansesData.filter(
        (obj) => obj.selectedCategory === e.target.value
      );
      setFilterData(filteredArray);
      console.log(filteredArray, filterActive);
    }
  };

  const [categoryObj, setCategoryObj] = useState({});
  const handleCategorySelection = (category) => {
    setSelectedCatagory(category.name);
    setSelectedCatId(category._id);
    setCategoryObj(category);
  };


  return (
    <>
      <div className="masterExpanseContainer">
        <Navbar title={"Config Expanses"} />
        <Tooltip placement="bottom-end" title="Add Expanse">
          <Box onClick={() => setOpenDialog(true)} className="expanseSpeedDialicon" sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial

              ariaLabel="SpeedDial openIcon example"
              sx={{ position: 'absolute', bottom: 16, right: 16, border: "2px solod red !important" }}
              icon={<SpeedDialIcon openIcon={<EditIcon />} />}
              direction="down"
            >
            </SpeedDial>
          </Box>
        </Tooltip>
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
            <MenuItem value={"All"}>All</MenuItem>
            {catagoryList.map((catagory) => {
              return <MenuItem value={catagory.name}>{catagory.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div className="expanseCardsContainer">
            
          {(filterActive ? filterData : expansesData).map((data) => {
            // console.log(data);
            return (
              <ExpanseCard expanse={data} />
            );
          })}
        </div>
        <ExpanseDialog catagoryList={catagoryList} open={openDialog} setOpen={setOpenDialog} />
      </div>

    </>
  );
};

export default ConfigExpanses;
