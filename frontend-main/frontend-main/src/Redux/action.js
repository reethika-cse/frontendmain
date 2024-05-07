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

import Axios from '../Services/Service'

export const submitUser = (username, email, password,navigate) => {
  const data = {
    name: username,
    email: email,
    password: password,
  };

  return (dispatch) => {
    dispatch({ type: ADD_USER_PENDING });
    Axios.post('/user/signup', data)
      .then((res) => {
        dispatch({ type: ADD_USER_FULFILLED, payload: res.data });
        navigate('/dashboard')
      })
      .catch((error) => {
        dispatch({ type: ADD_USER_REJECTED, payload: error?.response?.data?.message })
      });
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_LOGOUT, });
  }
}

export const loginUser = (email, password, navigate) => {
  const data = {
    email,
    password,
  }
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE_USER_PENDING });

    Axios.post('/user/login', data)
      .then((res) => {
        // console.log(res.data)
        dispatch({ type: AUTHENTICATE_USER_FULFILLED, payload: res.data });
        navigate('/dashboard');
      })
      .catch((err) => {
        dispatch({ type: AUTHENTICATE_USER_REJECTED, payload: err?.response?.data?.message });
      });
  };
}

export const getBudgetData = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_BUDGET_PENDING });
    Axios.get('/budget/getBudget')
    .then(res => {
      console.log(res.data)
       dispatch({ type: GET_USER_BUDGET_FULFILLED, payload: res.data});
    })
    .catch((err) => {
       dispatch({ type: GET_USER_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
};


export const addBudgetData = (budgetName, totalAmount, catagories, categoryName) => {
  
  const catagoriesArray = Object.entries(catagories).map(([name, amount]) => ({
    name,
    amount,
  }));
  
  const data = {

    budget: {
      name: budgetName,
      categories: catagoriesArray,
      totalAmount,

    }
  };

  return (dispatch) => {
    dispatch({ type: ADD_USER_BUDGET_PENDING });
    Axios.post('/budget/createBudget', data)
    .then((res) => {
      dispatch({ type: ADD_USER_BUDGET_FULFILLED, payload: res.data });
      dispatch(getBudgetData());
      const { budgetData: { _id } } = res.data;
      dispatch(createCatgory(categoryName, totalAmount, _id));
    })
    .catch(err => {
      dispatch({ type: ADD_USER_BUDGET_REJECTED, payload: err?.response?.data?.message });
    })
  }
}
export const addExpense = (description, amount, categoryId, date) => {
  const data = {
    description,
    amount,
    categoryId,
    date,
  }
  console.log(data);
  return (dispatch) => {
    dispatch({ type: ADD_USER_EXPANSE_PENDING })
    Axios.post('/budget/createExpanse', data)
    .then(res => {
      dispatch({ type: ADD_USER_EXPANSE_FULFILLED, payload: res.data });
      dispatch(getExpenses());
    })
    .catch(err => {
      dispatch({ type: ADD_USER_EXPANSE_REJECTED, payload: err?.response?.data?.message });
    })
  }
}
export const createCatgory = (name,allocatedAmount,budgetId) => {
  const data = {
    name,
    allocatedAmount,
    budgetId
  }
  return (dispatch) => {
    dispatch({ type: ADD_BUDGET_CATEGORY_PENDING })
    Axios.post('/budget/addCategory', data)
    .then((res) => {
      dispatch({ type: ADD_BUDGET_CATEGORY_FULFILLED, payload: res.data });
      dispatch(getBudgetData())
    })
    .catch(err => {
      dispatch({ type: ADD_BUDGET_CATEGORY_REJECTED, payload: err?.response?.data?.message })
    })
  }
}



export const getAllExpensesAndDate = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_EXPANSES_AND_DATE_PENDING });
    Axios.get('/budget/getExpanseAndDates')
    .then(res => {
      dispatch({ type: GET_USER_EXPANSES_AND_DATE_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_USER_EXPANSES_AND_DATE_REJECTED, payload: err.response?.data?.message });
    });
  };
};

export const getAccessToken = () => {
  const data = {
    refreshToken: localStorage.getItem('REF_TOKEN'),
  }
  console.log(data);
  return (dispatch) => {
    dispatch({ type: GET_USER_REF_TOKEN_PENDING })
    Axios.post('/user/getToken', data)
    .then(res => {
      dispatch({ type: GET_USER_REF_TOKEN_FULFILLED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_REF_TOKEN_REJECTED, payload: err.response?.data?.message })
    })
  }
}


export const getExpenses = () => {

  return (dispatch) => {
    dispatch({ type: GET_USER_EXPANSE_PENDING });
    Axios.get('/budget/getExpanses')
    .then(res => {
      dispatch({ type: GET_USER_EXPANSE_FULFILLED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_USER_EXPANSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const deleteCategory = (_id) => {
  const data = {
    categoryId: _id,
  }
  return (dispatch) => {
    dispatch({ type: REMOVE_BUDGET_CATEGORY_PENDING });
    Axios.post('/budget/deleteCategory', data)
    .then(res => {
      dispatch({ type: REMOVE_BUDGET_CATEGORY_FULFILLED, payload: res.data });
      dispatch(getBudgetData());
    })
    .catch(err => {
      dispatch({ type: REMOVE_BUDGET_CATEGORY_REJECTED, payload: err?.response?.data?.message})
    });
  }
}

export const deleteExpense = (_id) => {
  const data = {
    expenseId: _id,
  }
  return (dispatch) => {
    dispatch({ type: REMOVE_USER_EXPANSE_PENDING });
    Axios.post('/budget/deleteExpanse', data)
    .then(res => {
      dispatch({ type: REMOVE_USER_EXPANSE_FULFILLED, payload: res.data });
      dispatch(getExpenses());
    })
    .catch(err => {
      dispatch({ type: REMOVE_USER_EXPANSE_REJECTED, payload: err?.response?.data?.message})
    });
  }
}


