import {

  addExpense,
  getExpenses,
  deleteExpense,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  addExpense: (description, amount, categoryId, date) => dispatch(addExpense(description, amount, categoryId, date)),
  getExpenses: (categoryId) => dispatch(getExpenses(categoryId)),
  deleteExpense: (categoryId) => dispatch(deleteExpense(categoryId)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  userDetails: state.userDetails,
  budgetsData: state.budgetsData,
  expensesData: state.expensesData,
});