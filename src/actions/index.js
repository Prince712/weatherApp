import axios from 'axios';
import { API_KEY_WEATHER } from '../utils/Constants';
import {REGISTER_USER,LOGIN_USER} from './types';

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
