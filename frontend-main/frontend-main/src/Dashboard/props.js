import {
  getBudgetData,
  addBudgetData,
  createCatgory,
  deleteCategory,
  getExpenses,
  getAllExpensesAndDate,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgetData: () => dispatch(getBudgetData()),
  addBudgetData: (budgetName, totalAmount, catagories) => dispatch(addBudgetData(budgetName, totalAmount, catagories)),
  createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  getExpenses: () => dispatch(getExpenses()),
  deleteCategory: (_id) => dispatch(deleteCategory(_id)),
  getAllExpensesAndDate: () => dispatch(getAllExpensesAndDate()),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  userDetails: state.userDetails,
  budgetsData: state.budgetsData,
  barChartExpnesesData: state.barChartExpnesesData,
  expensesData: state.expensesData,
});