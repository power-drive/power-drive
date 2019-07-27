import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Container, Button } from "@material-ui/core";
import TopNav from "../../components/admin/layout_components/topNav";
import MaterialTable from "material-table";

//  INDEX ROUTE

const tableColumns = [
  { title: "Quotation No.", field: "_id" },
  { title: "Company Name", field: "name" },
  { title: "Cartegory", field: "cartegory" },
  { title: "Date Requsted", field: "date_created" },
  { title: "Requsted Path", field: "request_path" },
  { title: "Response Path", field: "response_path" },
  { title: "responded", field: "responded" }
];

const QuotationsList = () => {
  const [actionData, setActionData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState("Available Quotation Requests");
  const [tableOptions, setTableOptions] = useState({
    selection: true,
    pageSize: 10,
    exportButton: true,
    pageSizeOptions: [10, 20, 30]
  });

  const [tableActions, setTableActions] = useState([
    {
      tooltip: "Edit The Selected User",
      icon: "edit",
      onClick: (evt, data) => {
        if (data.length > 1) {
          alert("You cannot edit more than one ");
        } else {
          // this._toggleFormModal(data);
        }
      }
    },

    {
      tooltip: "Remove All Selected Users",
      icon: "delete",
      onClick: (evt, data) => {
        console.log(data);
      }
    }
  ]);

  useEffect(() => {
    axios
      .get("/api/admin/getquotations", {
        headers: { "content-type": "application/JSON" }
      })
      .then(res => {
        const data = res.data.map(element => {
          return {
            ...element,
            name: element.supplier.name,
            cartegory: element.supplier.cartegory,
            request_path: `https://powerdrive1.herokuapp.com/${
              element.request_path
            }`,
            response_path: `https://powerdrive1.herokuapp.com/${
              element.response_path
            }`,

            responded: element.responded ? "True" : "False"
          };
        });
        setTableData(data);
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.msg);
        }
      });
  }, []);
  //   _toggleFormModal(data) {
  //     if (Array.isArray(data)) {
  //       this.setState({
  //         actionData: data[0],
  //         formTitle: "Updating Activity",
  //         formModalOpen: !this.state.formModalOpen
  //       });
  //     } else {
  //       this.setState({
  //         formTitle: "Adding New Activity",
  //         actionData: null,
  //         formModalOpen: !this.state.formModalOpen
  //       });
  //     }
  //   }

  return (
    <main>
      <Container fixed style={{ marginTop: "100px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <TopNav />
          </Grid>
          <Grid item>
            <div style={{ marginTop: "180px" }}>
              <Link to="/admin/newquotation">
                <Button variant="outlined" color="default">
                  New Quotation
                </Button>
              </Link>

              <MaterialTable
                columns={tableColumns}
                title={tableTitle}
                options={tableOptions}
                actions={tableActions}
                data={tableData}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default QuotationsList;
