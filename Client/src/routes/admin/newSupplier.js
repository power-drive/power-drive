import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@material-ui/core";
//import { uploadFile } from "../../js/actions/fileuploadActions";
import TopNav from "../../components/admin/layout_components/topNav";

const cartegories = [
  "Insurance",
  "Motor Vehicle Spares",
  "Electronics Manufacturing & Equipment",
  "Furniture and Fittings",
  "Agricultural Services & Products",
  "Architectural Services",
  "Computer Software",
  "Power Utilities"
];
const NewSupplier = props => {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const [company, setCompany] = useState({
    sales_contact: {}
  });

  // STORE SUBSCRIPTION
  const dispatch = useDispatch();
  //   const user = useSelector(state => state.auth.user);
  //   const server_state = useSelector(state => state.server_state);
  //   const students = useSelector(state => state.company.students);
  //   const file = useSelector(state => state.file_upload.file);

  // FUNCTIONS

  //   useEffect(() => {
  //     if (file && submit) {
  //       dispatch(
  //         registerStudent({
  //           ...company,
  //           dob: moment(company.dob).format("YYYY-MM-DD"),
  //           image_path: "/" + file.path,
  //           school_id: user.school_id,
  //           class_id: user.class_id
  //         })
  //       );
  //       setSubmit(false);
  //     }
  //   }, [file]);

  const _onSubmit = async e => {
    e.preventDefault();
    console.log(company);

    registerCompany(company);
  };

  // RENDER
  return (
    <Container fixed style={{ marginTop: "100px" }}>
      <TopNav history={props.history} />

      <Grid container justify="center" spacing={4}>
        <Grid item xs={3}>
          <h3>New Suppliers</h3>
        </Grid>
        <Grid item xs={9}>
          <form onSubmit={_onSubmit} className={classes.form}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item md={7} sm={7} xs={8}>
                <TextInput
                  fullWidth
                  id="name"
                  label="Trading Name "
                  className={classes.textField}
                  margin="normal"
                  value={company.name}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        name: value
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={7} xs={12}>
                <TextInput
                  fullWidth
                  id="regnumber"
                  label="Company's Registration Number"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.reg_number}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        reg_number: value
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="cartegory">Select Cartegory</InputLabel>
                  <Select
                    value={company.cartegory}
                    onChange={e =>
                      setCompany(prevState => {
                        return { ...prevState, cartegory: e.target.value };
                      })
                    }
                    inputProps={{
                      name: "cartegory",
                      id: "cartegory"
                    }}
                  >
                    {cartegories.map((element, index) => {
                      return (
                        <MenuItem value={element} key={index}>
                          {element}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justify="flex-start" spacing={5}>
              <Grid item md={6} sm={6} xs={12}>
                <TextInput
                  fullWidth
                  id="director"
                  label="Director Full Name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.director}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        director: value
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextInput
                  fullWidth
                  id="phone"
                  label="Phone"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.phone}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        phone: value
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <TextInput
                  fullWidth
                  id="address"
                  label="Company's Address"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.address}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        address: value
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={6} sm={6} xs={8}>
                <TextInput
                  fullWidth
                  id="guardian_name"
                  label="Sales Personnel Name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.sales_contact.name}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        sales_contact: {
                          ...prevState.sales_contact,
                          name: value
                        }
                      };
                    });
                  }}
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextInput
                  fullWidth
                  id="sales_contact"
                  label="Sales Department Phone"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={company.sales_contact.phone}
                  onChange={event => {
                    const { value } = event.target;
                    setCompany(prevState => {
                      return {
                        ...prevState,
                        sales_contact: {
                          ...prevState.sales_contact,
                          phone: value
                        }
                      };
                    });
                  }}
                />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={2}>
              <Grid item md="10" sm="10" xs="10">
                <Btn fullWidth type="submit">
                  Register Company
                </Btn>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(7)
  },
  formControl: {
    marginLeft: theme.spacing(4)
  },

  group: {
    marginLeft: theme.spacing(2),
    flexDirection: "row"
  },

  textField: {
    marginLeft: theme.spacing(1)
    // marginRight: theme.spacing(3)
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
export default NewSupplier;

const registerCompany = company => {
  axios
    .post("/api/supplier/new", company, {
      headers: { "content-type": "application/JSON" }
    })
    .then(res => {
      alert(res.data.msg);
    })
    .catch(err => {
      alert(err.response.data.msg);
    });
};
