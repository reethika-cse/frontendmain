import React, { useEffect, useState } from 'react';


import { AgChartsReact } from "ag-charts-react";
import './Dashboard.css';
import Navbar from '../Navbar';
import "ag-charts-enterprise";
import { Divider, Paper } from '@mui/material';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

const Dashboard = (props) => {


  const {
    getBudgetData,
    budgetsData,
    getAllExpensesAndDate,
    expensesData,
    getExpenses,
    barChartExpnesesData,
  } = props;

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        await getBudgetData();
        await getAllExpensesAndDate();
        await getExpenses();
      }
      catch (er) {
        alert('Something went Wrong', er.message);
      }
    }
    fetchBudgetData();
  }, []);

  const [dataForExpanses, setDataForExpanses] = useState(expensesData);
  const [dataForBudget, setDataForBudget] = useState(budgetsData);
  const [dataForLine, setDataForLine] = useState(barChartExpnesesData)

  const [totalExpanseAmount, setTotalExpanseAmount] = useState(0);


  useEffect(() => {
    setDataForExpanses(expensesData);
    setDataForBudget(budgetsData);
    setDataForLine(barChartExpnesesData);
  }, [expensesData, budgetsData, barChartExpnesesData])
  const [optionsForRadar, setOptionsForRadar] = useState({
    data: [],
    title: {
      text: "Expenses Done in each category",
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.9,
        innerLabels: [
          {
            text: "Total Expense Amount",
            fontWeight: "bold",
          },
          {
            text: '',
            margin: 4,
            // fontSize: 48,
            // color: "green",
          },
        ],
        innerCircle: {
          fill: "#c9fdc9",
        },
      },
    ],
  });
  function formatNumber(value) {
    value /= 1000_000;
    return `${Math.floor(value)}M`;
  };
  const [optionsForBar, setOptionsForBar] = useState({
    data: [],
    title: {
      text: "Allocated Amount per category",
    },

    series: [
      {
        type: "bar",
        xKey: "year",
        yKey: "visitors",
        cornerRadius: 15,
        label: {
          formatter: ({ value }) => `$ ${value}`,
        },
        tooltip: {
          renderer: ({ datum, xKey, yKey }) => {
            return { title: datum[xKey], content: `$${datum[yKey]}` };
          },
        },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Expense Categories",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Allocated Amount",
        },
        label: {
          formatter: ({ value }) => `$${value}`,
        },
        crosshair: {
          label: {
            renderer: ({ value }) =>
              `<div style="padding: 0 7px; border-radius: 2px; line-height: 1.7em; background-color: rgb(71,71,71); color: rgb(255, 255, 255);">${formatNumber(value)}</div>`,
          },
        },
      },
    ],
  });
  const [optionsForLine, setOptionsForLine] = useState({
    data: [],
    title: {
      text: "Expenses Vs Date",
    },

    series: [
      {
        type: "line",
        xKey: "week",
        yKey: "belize",
        yName: "Date: Expense",
      },

    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Dates",
        },
        label: {
          formatter: (params) => `${params.value}`,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "$ per Date",
        },
      },
    ],
  });



  useEffect(() => {
    console.error(dataForBudget)
    if (dataForExpanses && dataForExpanses.length > 0) {
      const data = [];
      dataForExpanses.map((expanse) => {
        setTotalExpanseAmount(totalExpanseAmount + expanse.amount);
        data.push({
          asset: expanse.categoryName,
          amount: expanse.amount,
        });
      });
      setOptionsForRadar({ ...optionsForRadar, data: [...data], series: [{...optionsForRadar.series[0] , innerLabels: [{...optionsForRadar.series[0].innerLabels[0]}, {...optionsForRadar.series[0].innerLabels[1], text:`$${totalExpanseAmount}`} ]}] });
    }
    if (dataForBudget && Object.keys(dataForBudget).length > 0) {
      const data = [];
      dataForBudget.categories && dataForBudget.categories.length > 0 && dataForBudget.categories.map((category) => {

        data.push({
          year: category.name,
          visitors: category.allocatedAmount,
        });
      });

      setOptionsForBar({ ...optionsForBar, data: [...data] });
    }
    if (dataForLine && dataForLine.length > 0) {
      const data = [];
      dataForLine.map((expanse) => {
        data.push({
          week: expanse.date,
          belize: expanse.totalAmountSpent,
          // age: expanse.totalAmountSpent,
        })
      })
      setOptionsForLine({ ...optionsForLine, data: data });
    }
  }, [dataForExpanses, dataForBudget, dataForLine]);
  // console.log(optionsForRadar)

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));


  const handleFilter = (date) => {
    const monthObj = new Date(date);
    const monthIndex = monthObj.getMonth();
    console.log(date, monthIndex)
    setSelectedMonth(date)
    const filterdHBarData = expensesData.filter(expanse => {
      const transactionDate = new Date(expanse.date);
      return transactionDate.getMonth() === monthIndex;
    });
    // debugger
    setDataForExpanses(filterdHBarData);
    console.log(filterdHBarData)
    const filterdLineData = barChartExpnesesData.filter(item => {
      const date = new Date(item.date);
      return date.getMonth() === monthIndex;
    });
    setDataForLine(filterdLineData);
    if(filterdLineData.length === 0 || filterdHBarData.length === 0) {
      setOptionsForLine({ ...optionsForLine, data: [] });
      setOptionsForRadar({ ...optionsForRadar, data: [], series: [{...optionsForRadar.series[0] , innerLabels: [{...optionsForRadar.series[0].innerLabels[0]}, {...optionsForRadar.series[0].innerLabels[1], text:`$${0}`} ]}] });
    }
  }

  return (<>
      <Navbar title={'Dashboard'} />
    <div className="masterDashBoardContainer">
      <Paper elevation={3} className="masteChartsContainer">
        <div className="chartSection">
          <div className='filterContainer'>
            <label htmlFor="monthPicker" className="form-label">
              Select Month Filter
            </label>
            <DatePicker
              id="monthPicker"
              className="form-control"
              selected={selectedMonth}
              onChange={(e) => handleFilter(e)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div className="chartContainer">
            <AgChartsReact options={optionsForRadar} />
          </div>
          <Divider sx={{ width: "100%" }} />
          {/* <hr className='dividers' /> */}
          <div className="chartContainer">
            <AgChartsReact options={optionsForBar} />
          </div>
          <Divider sx={{ width: "100%" }} />
          {/* <hr className='dividers' /> */}
          <div className="chartContainer">
            <AgChartsReact options={optionsForLine} />
          </div>
        </div>
      </Paper>

    </div>
  </>)
}

export default Dashboard;