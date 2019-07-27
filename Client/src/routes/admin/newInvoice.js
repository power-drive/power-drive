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
const NewInvoice = props => {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [cartegory, setCartegory] = useState(null);
  const [quotation, setQuotation] = useState({
    responded: false,
    deadline: ""
  });

  useEffect(() => {
    if (quotation.supplier) {
      const sup = suppliers
        .map(element => element)
        .filter(element => element._id == quotation.supplier);
      setCartegory(sup[0].cartegory);
    }
  }, [quotation]);

  useEffect(() => {
    axios
      .get("/api/supplier/getlist", {
        headers: { "content-type": "application/JSON" }
      })
      .then(res => {
        setSuppliers(res.data);
      })
      .catch(err => {
        alert(err.response.data.msg);
      });
  }, []);

  const _onSubmit = async e => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      await axios
        .post("/api/upload/file", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          let data = quotation;
          data.request_path = res.data.file.path;
          data.response_path = null;
        })
        .catch(err => {
          let data = quotation;
          data.request_path = err.response.data.error.path;
          data.response_path = null;
          saveQuotation(data);
        });
    } else {
      alert("Please upload your request document");
    }
  };

  // RENDER
  return (
    <Container fixed style={{ marginTop: "100px" }}>
      <TopNav />

      <Grid container justify="center" spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={3}>
              <h3>New Invoice Request</h3>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} xs={8}>
          <form onSubmit={_onSubmit} className={classes.form}>
            <Grid container justify="cente" spacing={2}>
              <Grid item md={11} sm={11} xs={8}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="cartegory">Select Supplier</InputLabel>
                  <Select
                    required
                    value={quotation.supplier}
                    onChange={e =>
                      setQuotation(prevState => {
                        return { ...prevState, supplier: e.target.value };
                      })
                    }
                    inputProps={{
                      name: "supplier",
                      id: "supplier"
                    }}
                  >
                    {suppliers.map((element, index) => {
                      return (
                        <MenuItem value={element._id} key={index}>
                          {element.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={7} xs={12}>
                <TextInput
                  fullWidth
                  id="regnumber"
                  disabled
                  label="Company Cartegory"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={cartegory ? cartegory : "."}
                />
              </Grid>

              <Grid item md={7} xs={12}>
                <TextInput
                  fullWidth
                  required
                  id="regnumber"
                  label="Deadline"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={quotation.deadline}
                  onChange={event => {
                    const { value } = event.target;
                    setQuotation(prevState => {
                      return { ...prevState, deadline: value };
                    });
                  }}
                />
              </Grid>

              <Grid item md={7} sm={7} xs={8}>
                <label>Attach proof of payment</label>
                <input
                  accept="*"
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={2}>
              <Grid item md="10" sm="10" xs="10">
                <Btn fullWidth type="submit">
                  Send Request
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

const saveQuotation = quotation => {
  axios
    .post("/api/admin/newinvoice", quotation, {
      headers: { "content-type": "application/JSON" }
    })
    .then(res => {
      alert(res.data.msg);
    })
    .catch(err => {
      alert(err.response.data.msg);
    });
};

export default NewInvoice;
