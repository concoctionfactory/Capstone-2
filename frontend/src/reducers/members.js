import { FETCH_ALL_MEMBERS } from "../actions/types";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_MEMBERS: {
      return [...action.users];
    }

    default:
      return state;
  }
}
