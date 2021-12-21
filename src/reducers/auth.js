import {REGISTER_USER, LOGIN_USER, UPDATE_USER_INFO,UPDATE_MAP_INFO, LOGOUT} from '../actions/types';
import update from 'immutability-helper';
const initialState = {
  users: [],
  loggedInUser: null,
  map:{latitude: 21.1667, longitude: 72.8333},
};

const auth = (state = initialState, action) => {
  
  switch (action.type) {
    case REGISTER_USER:
      return update(state, {
        users: {$push: [action.payload]},
        loggedInUser: {$set: action.payload},
      });

    case LOGIN_USER:
      let incomingData = action.payload;
      let checkUserExist =
        state.users.length > 0 &&
        state.users.filter(
          user =>
            user.email == incomingData.email &&
            user.password == incomingData.password,
        );
      return update(state, {
        loggedInUser: {
          $set: checkUserExist.length > 0 ? checkUserExist[0] : null,
        },
      });

    case UPDATE_USER_INFO:
      console.log('para,s', action.payload);
      let index = state.users.findIndex(
        item => item.email === action.payload.email,
      );

      return update(state, {
        loggedInUser: {
          firstName: {$set: action.payload.firstName},
          lastName: {$set: action.payload.lastName},
          mobile: {$set: action.payload.mobile},
        },
        users: {
          [index]: {
            firstName: {$set: action.payload.firstName},
            lastName: {$set: action.payload.lastName},
            mobile: {$set: action.payload.mobile},
          },
        },
      });

      case UPDATE_MAP_INFO:       
        return update(state,{map:{latitude:{ $set: action.payload.lat},longitude:{ $set: action.payload.lon}}});


      case LOGOUT:       
        return update(state, {loggedInUser: {$set:  null}});

    default:
      return state;
  }
};

export default auth;
