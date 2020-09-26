import {
  GET_BOARD,
  REMOVE_BOARD,
  UPDATE_BOARD,
  ADD_LIST_TASK,
  REMOVE_LIST_TASK,
  UPDATE_LIST_TASK,
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
} from "../actions/types";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_BOARD:
    case GET_BOARD: {
      let temp = action.board;
      let board = {
        id: temp.id,
        name: temp.name,
        members: temp.members,
      };

      if (temp.lists) {
        board.lists = {};
        temp.lists.forEach((li) => {
          let tempList = {
            id: li.id,
            name: li.name,
            board_id: li.board_id,
          };
          if (li.cards.length > 0) {
            tempList.cards = {};
            li.cards.forEach((ca) => {
              tempList.cards[ca.id] = ca;
            });
          }
          board.lists[li.id] = tempList;
        });
      }
      return {
        ...state,
        [board.id]: board,
      };
    }

    // case UPDATE_BOARD: {
    //   let temp = action.board;
    //   let board = { ...state[temp.id], name: temp.name };
    //   return {
    //     ...state,
    //     [board.id]: board,
    //   };
    // }

    // case ADD_BOARD: {
    //   let temp = action.board;
    //   let board = {
    //     id: temp.id,
    //     name: temp.name,
    //   };

    //   return {
    //     ...state,
    //     [board.id]: board,
    //   };
    // }

    case REMOVE_BOARD: {
      let temp = { ...state };
      delete temp[action.board.id];

      return {
        ...temp,
      };
    }

    case ADD_LIST_TASK: {
      action.list.cards = {};
      let board = state[action.list.board_id];
      return {
        ...state,
        [board.id]: {
          ...board,
          lists: { ...board.lists, [action.list.id]: action.list },
        },
      };
    }

    case UPDATE_LIST_TASK: {
      let board = state[action.list.board_id];
      return {
        ...state,
        [board.id]: {
          ...board,
          lists: {
            ...board.lists,
            [action.list.id]: {
              ...board.lists[action.list.id],
              ...action.list,
            },
          },
        },
      };
    }
    case REMOVE_LIST_TASK: {
      let boardId = action.list.board_id;
      const boardCopy = { ...state[boardId] };
      if (!boardCopy) return state;
      delete boardCopy.lists[action.list.id];
      return {
        ...state,
        [boardId]: { ...boardCopy },
      };
    }

    case ADD_TASK: {
      let boardId = action.boardId;
      let listId = action.card.list_id;
      let board = state[boardId];
      return {
        ...state,
        [boardId]: {
          ...board,
          lists: {
            ...board.lists,
            [listId]: {
              ...board.lists[listId],
              cards: {
                ...board.lists[listId].cards,
                [action.card.id]: action.card,
              },
            },
          },
        },
      };
    }

    case UPDATE_TASK: {
      let boardId = action.boardId;
      let listId = action.card.list_id;
      let board = state[boardId];
      return {
        ...state,
        [boardId]: {
          ...board,
          lists: {
            ...board.lists,
            [listId]: {
              ...board.lists[listId],
              cards: {
                ...board.lists[listId].cards,
                [action.card.id]: action.card,
              },
            },
          },
        },
      };
    }

    case REMOVE_TASK: {
      let boardId = action.boardId;
      let listId = action.card.list_id;
      let board = state[boardId];
      let cardsCopy = { ...board.lists[listId].cards };
      if (!cardsCopy) return state;
      delete cardsCopy[action.card.id];
      return {
        ...state,
        [boardId]: {
          ...board,
          lists: {
            ...board.lists,
            [listId]: {
              ...board.lists[listId],
              cards: cardsCopy,
            },
          },
        },
      };
    }

    default:
      return state;
  }
}
