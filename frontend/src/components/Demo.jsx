import React, { useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUserAPI } from "../actions/users";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function Demo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    await dispatch(loginUserAPI({ username: "alex_ant", password: "12345" }));
  }
  const [text, setText] = useState("");

  let main = (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            WorkFlow
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Project management made simple, get your work in a flow. Get started
            by signing up or trying out the demo mode
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  signup/ login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLogin}
                >
                  demo mode
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </main>
  );

  useEffect(() => {
    const timer = setTimeout(() => setText(main), 200);
    return () => clearTimeout(timer);
  }, []);
  return text;
}

export default Demo;
