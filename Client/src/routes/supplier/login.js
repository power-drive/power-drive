import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Container
} from "@material-ui/core";

export function SupplierLogin(props) {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({});
  const [logged, setLogged] = useState(false);

  // window.on("storage", event => {
  //   let supplier = JSON.parse(event.originalEvent.newValue);
  //   if (supplier) {
  //     props.history.push("/supplier/dashboard");
  //   }
  // });

  useEffect(() => {
    if (logged) {
      const supplier = JSON.parse(localStorage.getItem("supplier"));

      if (supplier) {
        props.history.push("/supplier/dashboard");
      } else {
        props.history.push("/supplier/loggin");
      }
    }
    setLogged(false);
  }, [logged]);

  const _onSubmit = async e => {
    e.preventDefault();
    await logIn(credentials);

    setLogged(true);
  };

  return (
    <Container style={{ marginTop: "150px" }} maxWidth="sm">
      <h2>Sign In</h2>
      <form className={classes.form} onSubmit={_onSubmit} autoComplete="off">
        <TextInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label=" Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={event => {
            const { value } = event.target;
            setCredentials(prevState => {
              return {
                ...prevState,
                username: value
              };
            });
          }}
        />
        <TextInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={event => {
            const { value } = event.target;
            setCredentials(prevState => {
              return {
                ...prevState,
                password: value
              };
            });
          }}
        />

        <Btn
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign In
        </Btn>
      </form>
    </Container>
  );
}

const logIn = data => {
  axios
    .post("/api/supplier/login", data, {
      headers: { "content-type": "application/JSON" }
    })
    .then(res => {
      localStorage.setItem("supplier", JSON.stringify(res.data));
    })
    .catch(err => {
      alert(err.response.data.msg);
    });
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  button: {
    marginBottom: theme.spacing(3),
    fontSize: 18
  }
}));

const TextInput = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#039e96"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#039e96"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)"
      },
      "&:hover fieldset": {
        borderColor: "#039e96"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#039e96"
      }
    }
  }
})(TextField);

const Btn = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText("#039e96"),
    backgroundColor: "#039e96",
    border: "1px solid #3ab5af",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#00c49f",
      color: "#000"
    },
    "&:active": {
      backgroundColor: "#00c49f",
      color: "#000"
    }
  }
}))(Button);

const GreenCheckbox = withStyles({
  root: {
    color: "#039e96",
    "&$checked": {
      color: "#039e96"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);
