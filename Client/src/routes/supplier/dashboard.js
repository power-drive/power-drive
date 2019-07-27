import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
  FormControl
} from "@material-ui/core";
import axios from "axios";

const SupplierDashboard = () => {
  const [quotations, setQuotations] = useState([]);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [invoices, setIvoices] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const user = JSON.parse(localStorage.getItem("supplier"));
  useEffect(() => {
    axios
      .get("/api/admin/getquotations", {
        headers: { "content-type": "application/JSON" }
      })
      .then(res => {
        const data = res.data
          .map(element => element)
          .filter(
            element => element.supplier._id == user._id && !element.responded
          );
        setQuotations(data);
      })
      .catch(err => {
        if (err.response.status) {
          // alert(err.response.data.msg);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/admin/getinvoices", {
        headers: { "content-type": "application/JSON" }
      })
      .then(res => {
        const data = res.data
          .map(element => element)
          .filter(
            element => element.supplier._id == user._id && !element.responded
          );
        setIvoices(data);
      })
      .catch(err => {
        if (err.response.status) {
          // alert(err.response.data.msg);
        }
      });
  }, []);

  const _onSubmit = e => {
    e.preventDefault();
  };

  const respondQ = quotation => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      axios
        .post("/api/upload/file", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          let data = quotation;
          data.response_path = res.data.file.path;
        })
        .catch(err => {
          let data = quotation;
          data.response_path = err.response.data.error.path;
          updateQuotation(data);
        });
    } else {
      alert("Please upload your response document");
    }
  };

  const respondInvoice = invoice => {
    if (image1) {
      const formData = new FormData();
      formData.append("file", image1);

      axios
        .post("/api/upload/file", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          let data = invoice;
          data.response_path = res.data.file.path;
        })
        .catch(err => {
          let data = invoice;
          data.response_path = err.response.data.error.path;
          updateInvoice(data);
        });
    } else {
      alert("Please upload your response document");
    }
  };

  return (
    <div>
      <Container fixed style={{ marginTop: "100px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item md={8} xs={8} />
          <Grid item xs={10}>
            <hr />
            <h1>Requested Quotations</h1>

            {quotations.length > 0 ? (
              quotations.map((element, index) => (
                <div key={index}>
                  <Card>
                    <CardContent>
                      <h5>Quotation No. : {element._id}</h5>
                      <h5>Date Requested : {element.date_created}</h5>
                      <h5>Deadline : {element.date_created}</h5>
                      <a
                        href={`https://powerdrive1.herokuapp.com/${
                          element.request_path
                        }`}
                        target="_blank"
                      >
                        View Request
                      </a>
                      <hr />
                      <form onSubmit={_onSubmit}>
                        <FormControl>
                          <label>Upload Quotation</label>
                          <input
                            accept="*"
                            type="file"
                            onChange={event => setImage(event.target.files[0])}
                          />
                        </FormControl>
                        <br />
                        <br />
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={() => respondQ({ _id: element._id })}
                          color="secondary"
                        >
                          Respond
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  <br />
                </div>
              ))
            ) : (
              <h3>No Quotation Has been Requested</h3>
            )}
          </Grid>

          <Grid item xs={10}>
            <hr />
            <h1> Requested Invoices </h1>
            {invoices.length > 0 ? (
              invoices.map((element, index) => (
                <div key={index}>
                  <Card>
                    <CardContent>
                      <h5>Invoioce No. : {element._id}</h5>
                      <h5>Date Requested : {element.date_created}</h5>
                      <h5>Deadline : {element.date_created}</h5>
                      <a
                        href={`https://powerdrive1.herokuapp.com/${
                          element.request_path
                        }`}
                        target="_blank"
                      >
                        View Request
                      </a>
                      <hr />
                      <form onSubmit={_onSubmit}>
                        <FormControl>
                          <label>Upload Invoice</label>
                          <input
                            accept="*"
                            type="file"
                            onChange={event => setImage1(event.target.files[0])}
                          />
                        </FormControl>
                        <br /> <br />
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={() => respondInvoice({ _id: element._id })}
                          color="secondary"
                        >
                          Respond
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  <br />
                </div>
              ))
            ) : (
              <h3>No Quotation Has been Requested</h3>
            )}
          </Grid>

          <Grid item xs={10}>
            <hr />
            <h1> Requested Deliveries </h1>
            {delivery.length > 0 ? (
              delivery.map((element, index) => (
                <div key={index}>
                  <Card>
                    <CardContent>
                      <h5>Invoioce No. : {element._id}</h5>
                      <h5>Date Requested : {element.date_created}</h5>
                      <h5>Deadline : {element.date_created}</h5>
                      <Button variant="outlined" color="secondary">
                        Respond
                      </Button>
                    </CardContent>
                  </Card>
                  <br />
                </div>
              ))
            ) : (
              <h3>No Delivery Has been Requested</h3>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const updateQuotation = quotation => {
  axios
    .post("/api/admin/updatequotation", quotation, {
      headers: { "content-type": "application/JSON" }
    })
    .then(res => {
      alert(res.data.msg);
    })
    .catch(err => {
      alert(err.response.data.msg);
    });
};

const updateInvoice = invoice => {
  axios
    .post("/api/admin/updatequotation", invoice, {
      headers: { "content-type": "application/JSON" }
    })
    .then(res => {
      alert(res.data.msg);
    })
    .catch(err => {
      alert(err.response.data.msg);
    });
};
export default SupplierDashboard;
