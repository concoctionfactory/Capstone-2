import axios from "axios";
import {
  GET_BOARD,
  ADD_BOARD,
  REMOVE_BOARD,
  UPDATE_BOARD,
  ADD_LIST_TASK,
  REMOVE_LIST_TASK,
  UPDATE_LIST_TASK,
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
} from "./types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export function getBoardAPI(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/boards/${id}`);
      return dispatch(getBoard(response.data.board));
    } catch (error) {
      return error;
    }
  };
}

function getBoard(board) {
  return {
    type: GET_BOARD,
    board,
  };
}

export function addBoardAPI(data) {
  let boardData = { ...data };
  // delete boardData.members;
  return async function (dispatch) {
    const response = await axios.post(`${API_URL}/boards/`, boardData);
    return dispatch(addBoard(response.data.board));
  };
}

function addBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}

export function updateBoardAPI(data) {
  let boardData = { ...data };
  // delete boardData.members;
  return async function (dispatch) {
    const response = await axios.patch(
      `${API_URL}/boards/${data.id}`,
      boardData
    );
    return dispatch(updateBoard(response.data.board));
  };
}

function updateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  };
}

export function removeBoardAPI(id) {
  return async function (dispatch) {
    const response = await axios.delete(`${API_URL}/boards/${id}`);
    return dispatch(removeBoard(response.data.board));
  };
}

function removeBoard(board) {
  return {
    type: REMOVE_BOARD,
    board,
  };
}

export function addListTaskAPI(data) {
  return async function (dispatch) {
    const response = await axios.post(`${API_URL}/lists`, data);
    return dispatch(addListTask(response.data.list));
  };
}

function addListTask(list) {
  return {
    type: ADD_LIST_TASK,
    list,
  };
}

export function removeListTaskAPI(list) {
  return async function (dispatch) {
    const response = await axios.delete(`${API_URL}/lists/${list.id}`);
    return dispatch(removeListTask(response.data.list));
  };
}

function removeListTask(list) {
  return {
    type: REMOVE_LIST_TASK,
    list,
  };
}

export function updateListTaskAPI(data) {
  return async function (dispatch) {
    const response = await axios.patch(`${API_URL}/lists/${data.id}`, data);

    return dispatch(updateListTask(response.data.list));
  };
}

function updateListTask(list) {
  delete list.cards;
  return {
    type: UPDATE_LIST_TASK,
    list,
  };
}

export function sendTaskToAPI(data, boardId) {
  return async function (dispatch) {
    const response = await axios.post(`${API_URL}/cards`, data);
    return dispatch(addTask(response.data.card, boardId));
  };
}

function addTask(card, boardId) {
  return {
    type: ADD_TASK,
    card,
    boardId,
  };
}

export function removeTaskToAPI(card, boardId) {
  return async function (dispatch) {
    const response = await axios.delete(`${API_URL}/cards/${card.id}`);
    return dispatch(removeTask(response.data.card, boardId));
  };
}

function removeTask(card, boardId) {
  return {
    type: REMOVE_TASK,
    card,
    boardId,
  };
}

export function updateTaskToAPI(card, boardId) {
  return async function (dispatch) {
    const response = await axios.patch(`${API_URL}/cards/${card.id}`, card);
    return dispatch(updateTask(response.data.card, boardId));
  };
}

function updateTask(card, boardId) {
  return {
    type: UPDATE_TASK,
    card,
    boardId,
  };
}
