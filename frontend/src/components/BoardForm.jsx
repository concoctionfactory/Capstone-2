import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBoardAPI, updateBoardAPI } from "../actions/boards";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import AutoMembers from "./AutoMembers";

function BoardFrom({ isOpen, handleOpen, handleClose, username, board }) {
  const dispatch = useDispatch();
  let initalFormState;
  if (board) {
    initalFormState = {
      name: board.name,
      members: board.members.map((m) => m.username),
    };
  } else {
    initalFormState = { name: "", members: [username] };
  }
  const [formData, setFormData] = useState(initalFormState);

  useEffect(
    function reloadFormData() {
      if (board) {
        setFormData({
          name: board.name,
          members: board.members.map((m) => m.username),
        });
      }
    },
    [isOpen, board]
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleAdd() {
    let data = formData;
    data.username = username;
    dispatch(addBoardAPI(data));
    setFormData(initalFormState);
    handleClose();
  }
  function handleEdit() {
    let data = formData;
    data.id = board.id;
    // let currMembers = board.members.map((b) => b.username);
    // let newMembers = data.members;

    // let remove = currMembers.filter((cm) => !newMembers.includes(cm));
    // let add = newMembers.filter((nm) => !currMembers.includes(nm));
    dispatch(updateBoardAPI(data));

    setFormData(initalFormState);
    handleClose();
  }

  function addMembers(members) {
    setFormData((data) => ({
      ...data,
      members: members,
    }));
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {board ? `Edit Board` : `Create new Board`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="board"
            type="text"
            onChange={handleChange}
            value={formData.name}
            fullWidth
          />
          <AutoMembers board={board} addMembers={addMembers}></AutoMembers>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {board && (
            <Button onClick={handleEdit} color="primary">
              update
            </Button>
          )}
          {!board && (
            <Button onClick={handleAdd} color="primary">
              add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BoardFrom;
