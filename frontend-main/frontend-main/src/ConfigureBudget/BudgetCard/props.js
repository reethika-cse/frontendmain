import {
  getBudgetData,
  addBudgetData,
  createCatgory,
  deleteCategory,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgetData: () => dispatch(getBudgetData()),
  // addBudgetData: (budgetName, totalAmount, catagories) => dispatch(addBudgetData(budgetName, totalAmount, catagories)),
  // createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  deleteCategory: (_id) => dispatch(deleteCategory(_id)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  userDetails: state.userDetails,
  budgetsData: state.budgetsData,
});