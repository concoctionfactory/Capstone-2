import {
  LOGIN,
  FETCH_USER,
  ADD_BOARD,
  REMOVE_BOARD,
  UPDATE_BOARD,
  SIGNOUT,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
    case FETCH_USER: {
      let temp = action.user;
      let user = {
        username: temp.username,
        first_name: temp.first_name,
        last_name: temp.last_name,
        email: temp.email,
        token: temp.token,
      };
      if (temp.boards) {
        user.boards = {};
        temp.boards.forEach((b) => {
          let board = {
            id: b.id,
            name: b.name,
            is_admin: b.board_id,
            members: b.members,
          };
          user.boards[b.id] = board;
        });
      }
      return { ...state, ...user };
    }
    case SIGNOUT: {
      return {};
    }
    case ADD_BOARD: {
      let board = action.board;
      let temp = { ...state.boards, [board.id]: board };
      return { ...state, boards: temp };
    }

    case REMOVE_BOARD: {
      let temp = { ...state.boards };
      delete temp[action.board.id];

      return { ...state, boards: temp };
    }

    case UPDATE_BOARD: {
      let board = action.board;
      let temp = { ...state.boards, [board.id]: board };
      return { ...state, boards: temp };
    }
    default:
      return state;
  }
}
