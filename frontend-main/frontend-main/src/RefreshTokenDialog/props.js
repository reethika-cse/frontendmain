import {
  getAccessToken,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(getAccessToken()),
});

export const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});