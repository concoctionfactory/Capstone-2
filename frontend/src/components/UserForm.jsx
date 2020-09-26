import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpUserAPI, updateUserAPI } from "../actions/users";
import Joi from "joi-browser";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  media: {
    height: 140,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string()
    .min(6)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().alphanum().min(5).max(30).required(),
});

function UserForm() {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  let initalFormState;

  if (user.username) {
    initalFormState = {
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  } else {
    initalFormState = {};
  }
  const [formData, setFormData] = useState(initalFormState);
  const [formErrors, setFormErrors] = useState({});

  function validate() {
    const result = Joi.validate(formData, schema, { abortEarly: false });
    console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors);

    if (errors) return;
    await dispatch(updateUserAPI(formData));
    history.push("/");
  }

  async function handleSignup(e) {
    e.preventDefault();

    const errors = validate();
    console.log(errors);
    setFormErrors(errors);

    if (errors) return;
    await dispatch(signUpUserAPI(formData));
    history.push("/");
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {user.username ? `Edit Profile ` : `Sign Up`}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="first_name"
            label="first_name"
            name="first_name"
            autoComplete="first"
            autoFocus
            onChange={handleChange}
            value={formData.first_name}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="last_name"
            label="last_name"
            name="last_name"
            autoComplete="last"
            autoFocus
            onChange={handleChange}
            value={formData.last_name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={formData.email}
            error={formErrors.email}
            helperText={formErrors.email}
          />
          {!user.username && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleChange}
              value={formData.username}
              error={formErrors.username}
              helperText={formErrors.username}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            error={formErrors.password}
            helperText={formErrors.password}
          />
          {user.username && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUpdate}
            >
              Update
            </Button>
          )}
          {!user.username && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

export default UserForm;
