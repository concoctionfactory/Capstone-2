import React, { useState } from "react";
import { useSelector } from "react-redux";

import clsx from "clsx";
import BoardForm from "./BoardForm";
import Demo from "./Demo";
import BoardElm from "./BoardElm";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Loading from "./Loading";
const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
  },
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 150,
  },
}));
function Home() {
  const user = useSelector((state) => state.users);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [boardForm, setBoardForm] = useState({
    isOpen: false,
  });

  const openBoardFrom = () => {
    setBoardForm({ isOpen: true });
  };

  const closeBoardFrom = () => {
    setBoardForm({ isOpen: false });
  };
  let userData = user || {};

  function getSummary() {
    let memberLen = 0;
    let boardLen = 0;

    if (userData.boards) {
      let boards = Object.values(userData.boards);
      boardLen = boards.length;
      let members = boards.reduce(
        (acc, curr) => [...acc, ...curr.members.map((m) => m.username)],
        []
      );
      let memberRes = new Set(members);
      memberLen = memberRes.size;
    }
    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Summary
        </Typography>
        <Typography component="p" variant="h4">
          {`${memberLen} members`}
        </Typography>
        <Typography component="p" variant="h4">
          {`${boardLen} boards`}
        </Typography>
      </React.Fragment>
    );
  }

  if (user === "loading") {
    return <Loading />;
  }

  if (!user.username) {
    return <Demo />;
  }

  return (
    <main className={classes.content}>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>{getSummary()}</Paper>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {userData.boards &&
            Object.entries(userData.boards).map(([key, value]) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <BoardElm
                  key={key}
                  board={value}
                  username={userData.username}
                />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              aria-label="add"
              color="primary"
              variant="contained"
              onClick={openBoardFrom}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Container>

      <BoardForm
        className={classes.fab}
        isOpen={boardForm.isOpen}
        handleOpen={openBoardFrom}
        handleClose={closeBoardFrom}
        username={user.username}
      ></BoardForm>
    </main>
  );
}

export default Home;
