import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addListTaskAPI, updateListTaskAPI } from "../actions/boards";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function ListTaskForm({ isOpen, handleOpen, handleClose, boardId, listTask }) {
  let initalFormState;
  if (listTask) {
    initalFormState = { name: listTask.name };
  } else {
    initalFormState = { name: "" };
  }

  const [formData, setFormData] = useState(initalFormState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }
  //   function handleClose

  const dispatch = useDispatch();
  function handleAdd() {
    let data = formData;
    data.board_id = boardId;
    dispatch(addListTaskAPI(data));
    setFormData(initalFormState);
    handleClose();
  }
  function handleEdit() {
    let data = formData;
    data.board_id = boardId;
    data.id = listTask.id;

    dispatch(updateListTaskAPI(data));
    setFormData(initalFormState);
    handleClose();
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {listTask ? `Edit lisr` : `Create new list`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="list"
            type="text"
            onChange={handleChange}
            value={formData.name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {listTask && (
            <Button onClick={handleEdit} color="primary">
              update
            </Button>
          )}
          {!listTask && (
            <Button onClick={handleAdd} color="primary">
              add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListTaskForm;
