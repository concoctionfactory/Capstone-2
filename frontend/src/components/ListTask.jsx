import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Task from "./Task";
import ListTaskForm from "./ListTaskForm";
import TaskFrom from "./TaskForm";
import { removeListTaskAPI } from "../actions/boards";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  add: {
    marginLeft: "auto",
  },
}));

function ListTask({ list }) {
  const { id, name, cards, board_id } = list;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeListTaskAPI(list));
    handleClose();
  }

  const [taskForm, setTaskForm] = useState({
    isOpen: false,
  });

  const openTaskFrom = () => {
    handleClose();
    setTaskForm({ isOpen: true });
  };

  const closeTaskFrom = () => {
    setTaskForm({ isOpen: false });
  };

  const [listTaskForm, setListTaskForm] = useState({
    isOpen: false,
  });

  const openListTaskFrom = () => {
    handleClose();
    setListTaskForm({ isOpen: true });
  };

  const closeListTaskFrom = () => {
    setListTaskForm({ isOpen: false });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={openListTaskFrom}>Edit</MenuItem>
      </Menu>

      <CardContent>
        <Grid container spacing={1}>
          {cards &&
            Object.entries(cards).map(([key, value]) => (
              <Grid item key={key} xs={12}>
                <Task key={key} card={value} boardId={board_id}></Task>
              </Grid>
            ))}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label="add"
          color="primary"
          variant="contained"
          onClick={openTaskFrom}
          className={classes.add}
        >
          <AddIcon />
        </Button>
      </CardActions>

      <ListTaskForm
        className={classes.fab}
        isOpen={listTaskForm.isOpen}
        handleOpen={openListTaskFrom}
        handleClose={closeListTaskFrom}
        boardId={board_id}
        listTask={list}
      ></ListTaskForm>

      <TaskFrom
        className={classes.fab}
        isOpen={taskForm.isOpen}
        handleOpen={openTaskFrom}
        handleClose={closeTaskFrom}
        listTaskId={id}
        boardId={board_id}
      ></TaskFrom>
    </Card>
  );
}

export default ListTask;
