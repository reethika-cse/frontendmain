import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
// import Signup from './Views/LoginSignUp/Signup';
import Dashboard from './Dashboard';
import ConfigExpanses from './ConfigExpanses';
import ConfigureBudget from './ConfigureBudget';
import { useState, useEffect } from "react";

import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import RefreshTokenDialog from './RefreshTokenDialog';
// import { Dashboard } from '@mui/icons-material';
const App = (props) => {
  const {
    isUserLoggedIn
  } = props;
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isUserLoggedIn && localStorage.getItem("TOKEN")) setOpenDialog(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [isUserLoggedIn]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/cofigureBudget" element={<ConfigureBudget />} />
          <Route path="/addExpense" element={<ConfigExpanses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
      <RefreshTokenDialog open={openDialog} setOpen={setOpenDialog}/>
      <ToastContainer/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});

export default connect(mapStateToProps, null)(App);