import {
  getBudgetData,
  addBudgetData,
  createCatgory,
  deleteCategory,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  addBudgetData: (budgetName, totalAmount, catagories, categoryName) => dispatch(addBudgetData(budgetName, totalAmount, catagories, categoryName)),
  createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  deleteCategory: (_id) => dispatch(deleteCategory(_id)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  budgetsData: state.budgetsData,
  userDetails: state.userDetails,
});