import {
  GET_ALL_USERS,
  UPDATE_USER_ADMIN,
  UPDATE_USER_BAN,
} from "../actions/getAllUsers";

const initialstate = {
  allUsers: [],
};

const usersReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case GET_ALL_USERS: {
      const orderedId = payload.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        allUsers: orderedId,
      };
    }
    case UPDATE_USER_BAN: {
      return {
        ...state,
      };
    }
    case UPDATE_USER_ADMIN: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
