import {
loginUser,
submitUser,
} from '../../Redux/action';

export const mapStateToProps = (state) => ({

});

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password, navigate) => dispatch(loginUser(email, password, navigate)),
  submitUser: (username, email, password, navigate) => dispatch(submitUser(username, email, password, navigate)),
});