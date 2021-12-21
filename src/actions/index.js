import {REGISTER_USER,LOGIN_USER,UPDATE_USER_INFO,UPDATE_MAP_INFO, LOGOUT} from './types';

export const registerUser = (data) => async (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      payload: data,
    })
};

export const loginUser = (data) => async (dispatch) => {
     dispatch({
        type: LOGIN_USER,
        payload: data,
      })
 };

 export const updateUserInfo = (data) => async (dispatch) => {
  dispatch({
     type: UPDATE_USER_INFO,
     payload: data,
   })
};
 export const updateMapInfo = (data) => async (dispatch) => {
  dispatch({
     type: UPDATE_MAP_INFO,
     payload: data,
   })
};
 export const logout = (data) => async (dispatch) => {
  dispatch({
     type: LOGOUT,
     payload: data,
   })
};
