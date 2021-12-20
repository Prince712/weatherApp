import {REGISTER_USER,LOGIN_USER} from '../actions/types';
import update from 'immutability-helper';
const initialState = {
  users: [],
  loggedInUser: null, 
};

const auth = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case REGISTER_USER:           
    return update(state, {users: {$push:[action.payload]},loggedInUser :{$set : action.payload}});

    case LOGIN_USER:       
          let incomingData = action.payload;  
          let checkUserExist = state.users.length > 0 && state.users.filter(user => user.email == incomingData.email && user.password == incomingData.password);
     return update(state, {loggedInUser :{$set : checkUserExist.length > 0 ? checkUserExist[0] : null}});
   
    default:
      return state;
  }
};

export default auth;
