
import {
  ADD_USER,
  ADD_USER_FULFILLED,
  ADD_USER_PENDING,
  ADD_USER_REJECTED,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_FULFILLED,
  AUTHENTICATE_USER_PENDING,
  AUTHENTICATE_USER_REJECTED,
  ADD_USER_BUDGET,
  ADD_USER_BUDGET_FULFILLED,
  ADD_USER_BUDGET_PENDING,
  ADD_USER_BUDGET_REJECTED,
  GET_USER_BUDGET,
  GET_USER_BUDGET_FULFILLED,
  GET_USER_BUDGET_PENDING,
  GET_USER_BUDGET_REJECTED,
  ADD_BUDGET_CATEGORY,
  ADD_BUDGET_CATEGORY_PENDING,
  ADD_BUDGET_CATEGORY_FULFILLED,
  ADD_BUDGET_CATEGORY_REJECTED,
  ADD_USER_EXPANSE,
  ADD_USER_EXPANSE_PENDING,
  ADD_USER_EXPANSE_FULFILLED,
  ADD_USER_EXPANSE_REJECTED,
  GET_USER_EXPANSE,
  GET_USER_EXPANSE_PENDING,
  GET_USER_EXPANSE_FULFILLED,
  GET_USER_EXPANSE_REJECTED,
  REMOVE_USER_EXPANSE,
  REMOVE_USER_EXPANSE_PENDING,
  REMOVE_USER_EXPANSE_FULFILLED,
  REMOVE_USER_EXPANSE_REJECTED,
  REMOVE_BUDGET_CATEGORY,
  REMOVE_BUDGET_CATEGORY_PENDING,
  REMOVE_BUDGET_CATEGORY_FULFILLED,
  REMOVE_BUDGET_CATEGORY_REJECTED,
  GET_USER_EXPANSES_AND_DATE,
  GET_USER_EXPANSES_AND_DATE_PENDING,
  GET_USER_EXPANSES_AND_DATE_FULFILLED,
  GET_USER_EXPANSES_AND_DATE_REJECTED,
  GET_USER_REF_TOKEN,
  GET_USER_REF_TOKEN_PENDING,
  GET_USER_REF_TOKEN_FULFILLED,
  GET_USER_REF_TOKEN_REJECTED,
  HANDLE_LOGOUT,
} from './actionTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  ussToken: '',
  userDetails: {
    username: '',
    email: '',
    _id: '',
    refreshToken: '',
  },
  
  userRegistrationSuccessful: false,
  isUserLoggedIn: false,
  budgetsData: {},
  totalBudgetAmount: 0,
  expensesData: [],
  barChartExpnesesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        
      }
    }
    case ADD_USER_PENDING: {
      return {
        ...state,
        
      }
    }
    case ADD_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`)
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        
        userRegistrationSuccessful: true,
        ussToken: token,
        userDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case ADD_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload)
      return {
        ...state,
        
        userRegistrationSuccessful: false,
      }
    }
    case HANDLE_LOGOUT: {
      localStorage.clear();
      debugger
      return {
        ...state,
        isUserLoggedIn: false,
      }
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        
      }
    }
    case AUTHENTICATE_USER_PENDING: {
      return {
        ...state,
        
      }
    }
    case AUTHENTICATE_USER_FULFILLED: {
      console.log(action.payload)
      const {
        token,
        refreshToken,
        user,
      } = action.payload;

      toast.success(`Welcome ${user.name}!!`)
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REF_TOKEN', refreshToken);


      return {
        ...state,
        
        isUserLoggedIn: true,
        userRegistrationSuccessful: true,
        ussToken: token,
        userDetails: {
          username: user.name,
          _id: user.id,
          email: user.email,
          refreshToken: user.refreshToken
        }
      }
    }
    case AUTHENTICATE_USER_REJECTED: {
      console.log(action.payload)
      toast.error(action.payload)
      return {
        ...state,
        
        userRegistrationSuccessful: false,
      }
    }
    case ADD_USER_BUDGET: {
      return {
        ...state,
      }
    }
    case ADD_USER_BUDGET_PENDING: {
      return {
        ...state,
        
      }
    }
    case ADD_USER_BUDGET_FULFILLED: {
      toast.success(action.payload.message)
      return {
        ...state,
      }
    }
    case ADD_USER_BUDGET_REJECTED: {
      toast.error('Could not add Budget!!!');
      return {
        ...state,
      }
    }
    case GET_USER_BUDGET: {
      return {
        ...state,
      }
    }
    case GET_USER_BUDGET_PENDING: {
      return {
        ...state,
        
      }
    }
    case GET_USER_BUDGET_FULFILLED: {
      const budgets = action.payload;
      if (budgets[0]) {
        let budgetAmount = 0;
        budgets[0]?.categories && budgets[0]?.categories.map(cat => {
          budgetAmount += cat.allocatedAmount;
        })
        return {
          ...state,
          budgetsData:budgets[0],
          totalBudgetAmount: budgetAmount,
        }
      }
      else {
        return {
          ...state,
          budgetsData: null,
        }
      }

    }
    case GET_USER_BUDGET_REJECTED: {
      toast.error('Could not get Budgets!!!');
      return {
        ...state,
      }
    }

    case ADD_BUDGET_CATEGORY: {
      return {
        ...state,
      }
    }
    case ADD_BUDGET_CATEGORY_PENDING: {
      return {
        ...state,
        
      }
    }
    case ADD_BUDGET_CATEGORY_FULFILLED: {
      toast.success("Category Added")

      return {
        ...state,
      }

    }
    case ADD_BUDGET_CATEGORY_REJECTED: {
      toast.error('Could not add Category!!!');
      return {
        ...state,
      }
    }
    case ADD_USER_EXPANSE: {
      return {
        ...state,
      }
    }
    case ADD_USER_EXPANSE_PENDING: {
      return {
        ...state,
        
      }
    }
    case ADD_USER_EXPANSE_FULFILLED: {
      toast.success('Expense Created!!');

      return {
        ...state,
      }

    }
    case ADD_USER_EXPANSE_REJECTED: {
      toast.error('Could not add Expense!!!');
      return {
        ...state,
      }
    }
    case GET_USER_EXPANSE: {
      return {
        ...state,
      }
    }
    case GET_USER_EXPANSE_PENDING: {
      return {
        ...state,
        
      }
    }
    case GET_USER_EXPANSE_FULFILLED: {
      const data = action.payload
      // debugger
      console.log(data)

      return {
        ...state,
        expensesData: data,
      }

    }
    case GET_USER_EXPANSE_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    case REMOVE_USER_EXPANSE: {
      return {
        ...state,
      }
    }
    case REMOVE_USER_EXPANSE_PENDING: {
      return {
        ...state,
        
      }
    }
    case REMOVE_USER_EXPANSE_FULFILLED: {
      toast.success('Expense Deleted Successfully!!!')
      return {
        ...state,
      }

    }
    case REMOVE_USER_EXPANSE_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }

    case REMOVE_BUDGET_CATEGORY: {
      return {
        ...state,
      }
    }
    case REMOVE_BUDGET_CATEGORY_PENDING: {
      return {
        ...state,
        
      }
    }
    case REMOVE_BUDGET_CATEGORY_FULFILLED: {
      toast.success('Category Deleted Successfully!!!')
      return {
        ...state,
      }

    }
    case REMOVE_BUDGET_CATEGORY_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    case GET_USER_EXPANSES_AND_DATE: {
      return {
        ...state,
      }
    }
    case GET_USER_EXPANSES_AND_DATE_PENDING: {
      return {
        ...state,
        
      }
    }
    case GET_USER_EXPANSES_AND_DATE_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        barChartExpnesesData: data,
      }
    }
    case GET_USER_EXPANSES_AND_DATE_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }

    case GET_USER_REF_TOKEN: {
      return {
        ...state,
      }
    }
    case GET_USER_REF_TOKEN_PENDING: {
      return {
        ...state,
        
      }
    }
    case GET_USER_REF_TOKEN_FULFILLED: {
      const {token} = action.payload;
      console.log(token)
      localStorage.setItem('TOKEN', token);
      toast.success('Recieved Refresh Token!!!', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
      return {
        ...state,
      }
    }
    case GET_USER_REF_TOKEN_REJECTED: {
      toast.error(action.payload);
      return {
        ...state,
      }
    }
    default: return state;
  };
};

export default reducer;