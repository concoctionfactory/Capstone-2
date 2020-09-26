import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function NotFound() {
  const classes = useStyles();
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
            Not Found
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            nothing found here
          </Typography>
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

export default NotFound;
