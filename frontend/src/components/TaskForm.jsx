import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  sendTaskToAPI,
  removeTaskToAPI,
  updateTaskToAPI,
} from "../actions/boards";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Divider from "@material-ui/core/Divider";

function TaskForm({
  isOpen,
  handleClickOpen,
  handleClose,
  listTaskId,
  boardId,
  task,
}) {
  let initalFormState;
  if (task) {
    initalFormState = {
      name: task.name,
      text: task.text,
      due_date: new Date(task.due_date),
      status: task.status,
    };
  } else {
    initalFormState = { text: "", status: "not_started" };
  }
  const [formData, setFormData] = useState(initalFormState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  const dispatch = useDispatch();
  function handleAdd() {
    let data = formData;
    data.list_id = listTaskId;
    dispatch(sendTaskToAPI(data, boardId));
    setFormData(initalFormState);
    handleClose();
  }

  function handleDelete() {
    dispatch(removeTaskToAPI(task, boardId));
    handleClose();
  }

  function handleEdit() {
    let data = formData;
    data.list_id = listTaskId;
    data.id = task.id;
    dispatch(updateTaskToAPI(data, boardId));
    handleClose();
  }

  const handleStatus = (event, newStatus) => {
    setFormData((data) => ({
      ...data,
      status: newStatus,
    }));
    console.log(formData);
  };

  const handleDateChange = (date) => {
    setFormData((data) => ({
      ...data,
      due_date: date,
    }));
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {task ? `Edit task` : `Create new task`}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label="text"
            multiline
            rows={4}
            fullWidth
            name="text"
            value={formData.text}
            onChange={handleChange}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={formData.due_date}
              name="due_date"
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <Divider variant="middle" />
          <ToggleButtonGroup
            size="small"
            value={formData.status}
            exclusive
            onChange={handleStatus}
            aria-label="status"
          >
            <ToggleButton value="not_started" aria-label="not_started">
              not started
            </ToggleButton>
            <ToggleButton value="in_progress" aria-label="in_progress">
              in progress
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed">
              complete
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogContent>
        <DialogActions>
          {task && (
            <Button onClick={handleDelete} color="primary">
              delete
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {task && (
            <Button onClick={handleEdit} color="primary">
              update
            </Button>
          )}

          {!task && (
            <Button onClick={handleAdd} color="primary">
              add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskForm;
