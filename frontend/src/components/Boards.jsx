import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBoardAPI } from "../actions/boards";
import ListTask from "./ListTask";
import ListTaskForm from "./ListTaskForm";
import BoardForm from "./BoardForm";
import Demo from "./Demo";
import NotFound from "./NotFound";
import Loading from "./Loading";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    display: "flex",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
}));

function Boards() {
  const classes = useStyles();
  const user = useSelector((state) => state.users);

  const boardId = Number(useParams().boardId);
  const board = useSelector((state) => state.boards[boardId]);
  console.log(user, boardId, board);
  const dispatch = useDispatch();
  useEffect(
    function loadPostWhenPostOrIdChanges() {
      async function getBoard() {
        await dispatch(getBoardAPI(boardId));
      }
      if (!board) {
        getBoard();
      }
    },
    [dispatch, boardId, board]
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [boardForm, setBoardForm] = useState({
    isOpen: false,
  });

  const openBoardFrom = () => {
    setBoardForm({ isOpen: true });
    handleClose();
  };

  const closeBoardFrom = () => {
    setBoardForm({ isOpen: false });
  };
  const [listTaskForm, setListTaskFormData] = useState({
    isOpen: false,
  });

  const openListTaskFrom = () => {
    setListTaskFormData({ isOpen: true });
  };

  const closeListTaskFrom = () => {
    setListTaskFormData({ isOpen: false });
  };

  function getNumCards(list) {
    if (list.cards) {
      let done = Object.values(list.cards).filter(
        (c) => c.status === "completed"
      ).length;
      let total = Object.keys(list.cards).length;
      return `${done}/${total}`;
    }
  }
  let boardData = board || {};

  if (user === "loading") return <Loading />;
  else if (!user.username) return <Demo />;
  if (board === "loading") {
    console.log("board");
    return <Loading />;
  }

  if (!board) return <NotFound />;

  if (board) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem>
                <Typography>{boardData.name}</Typography>
                <div className={classes.grow} />
                <IconButton
                  aria-label="settings"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
              <ListItem>
                {boardData.members &&
                  Object.entries(boardData.members).map(([key, value]) => (
                    <Avatar
                      key={key}
                      alt={value.username}
                      src="/broken-image.jpg"
                      className={classes.avatar}
                    />
                  ))}
              </ListItem>
            </List>
            <Divider />

            <List>
              {boardData.lists &&
                Object.entries(boardData.lists).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText
                      primary={value.name}
                      secondary={getNumCards(value)}
                    />
                  </ListItem>
                ))}
            </List>
            <Divider />
            <List>
              <ListItem>
                <Typography>activity</Typography>
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Box className={classes.container}>
            {boardData.lists &&
              Object.entries(boardData.lists).map(([key, value]) => (
                <ListTask key={key} list={value}></ListTask>
              ))}
          </Box>
        </main>

        <Fab
          color="primary"
          className={classes.fab}
          aria-label="add"
          onClick={openListTaskFrom}
        >
          <AddIcon />
        </Fab>

        <ListTaskForm
          className={classes.fab}
          isOpen={listTaskForm.isOpen}
          handleOpen={openListTaskFrom}
          handleClose={closeListTaskFrom}
          boardId={boardId}
        ></ListTaskForm>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={openBoardFrom}>Edit</MenuItem>
        </Menu>

        <BoardForm
          className={classes.fab}
          isOpen={boardForm.isOpen}
          handleOpen={openBoardFrom}
          handleClose={closeBoardFrom}
          username={user.username}
          board={board}
        ></BoardForm>
      </div>
    );
  }
}

export default Boards;
