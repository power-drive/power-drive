import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Container } from "@material-ui/core";
import TopNav from "../../components/admin/layout_components/topNav";
import MaterialTable from "material-table";

//  INDEX ROUTE

const tableColumns = [
  { title: "Company Name", field: "name" },
  { title: "Reg Number", field: "reg_number" },
  { title: "Director", field: "director" },
  { title: "Cartegory", field: "cartegory" },
  { title: "Address", field: "address" },
  { title: "Sales Contact", field: "sales_name" },
  { title: "Sales Phone", field: "sales_phone" }
];

const SuppliersList = () => {
  const [actionData, setActionData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState("Registered Supliers");
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
      .get("/api/supplier/getlist", {
        headers: { "content-type": "application/JSON" }
      })
      .then(res => {
        const data = res.data.map(element => {
          return {
            ...element,
            sales_name: element.sales_contact.name,
            sales_phone: element.sales_contact.phone
          };
        });
        setTableData(data);
      })
      .catch(err => {
        alert(err.response.data.msg);
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
        <TopNav />

        <Grid container justify="center" spacing={4}>
          <Grid item>
            <div style={{ marginTop: "180px" }}>
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

export default SuppliersList;
