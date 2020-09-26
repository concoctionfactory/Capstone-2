import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeBoardAPI } from "../actions/boards";
import BoardForm from "./BoardForm";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

function BoardElm({ board, username }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDelete() {
    dispatch(removeBoardAPI(board.id));
    handleClose();
  }

  const [boardForm, setBoardForm] = useState({
    isOpen: false,
  });

  const openBoardFrom = () => {
    handleClose();
    setBoardForm({ isOpen: true });
  };

  const closeBoardFrom = () => {
    setBoardForm({ isOpen: false });
  };

  return (
    <Card className={classes.card}>
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
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={openBoardFrom}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <CardActionArea
        className={classes.root}
        component={Link}
        to={`boards/${board.id}`}
      >
        <CardContent>
          <Typography>{board.name}</Typography>
        </CardContent>
      </CardActionArea>
      <BoardForm
        className={classes.fab}
        isOpen={boardForm.isOpen}
        handleOpen={openBoardFrom}
        handleClose={closeBoardFrom}
        username={username}
        board={board}
      ></BoardForm>
    </Card>
  );
}

export default BoardElm;
