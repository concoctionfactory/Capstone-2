import React, { useState } from "react";
import TaskFrom from "./TaskForm";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));
function Task({ card, boardId }) {
  const classes = useStyles();
  const { name, text, due_date, status, list_id } = card;

  const [taskForm, setTaskForm] = useState({
    isOpen: false,
  });

  const openTaskFrom = () => {
    setTaskForm({ isOpen: true });
  };

  const closeTaskFrom = () => {
    setTaskForm({ isOpen: false });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="edit" onClick={openTaskFrom}>
            <EditIcon />
          </IconButton>
        }
        title={
          <Typography gutterBottom="false" variant="subtitle">
            {name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="textSecondary">
            {text}
          </Typography>
        }
      />
      <CardActions>
        <Chip label={status} size="small" />
        {due_date && (
          <Chip
            label={moment(due_date, moment.defaultFormat).format(`ll`)}
            size="small"
          />
        )}
      </CardActions>

      <TaskFrom
        className={classes.fab}
        isOpen={taskForm.isOpen}
        handleOpen={openTaskFrom}
        handleClose={closeTaskFrom}
        listTaskId={list_id}
        boardId={boardId}
        task={card}
      ></TaskFrom>
    </Card>
  );
}

export default Task;
