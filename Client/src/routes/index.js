import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import { getAllConstants } from "../js/actions/constantActions";
// import { loadUser } from "../js/actions/authActions";

import Dashboard from "./admin/dashboard";
import TopBar from "../components/admin/layout_components/topBar";
import NewSupplier from "./admin/newSupplier";
import SuppliersList from "./admin/suppliers_list";
import SupplierDashboard from "./supplier/dashboard";
import { SupplierLogin } from "./supplier/login";
import TopBarS from "../components/admin/layout_components/topBar_S";
import QuotationsList from "./admin/quotations";
import NewQuotation from "./admin/newQuotations";
import InvoiceList from "./admin/invoice";
import NewInvoice from "./admin/newInvoice";

const Routes = () => {
  const [isAuthenticated, setIsAthenticated] = useState(true);
  const [isAuthenticated2, setIsAthenticated2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const isLoading = useSelector(state => state.auth.isLoading);
  // const constLoading = useSelector(state => state.constant.initLoading);

  useEffect(() => {
    const item = localStorage.getItem("supplier");

    setIsAthenticated2(item);
  }, [localStorage]);

  const Loading = () => <code>...Loading</code>;

  const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (isLoading) {
            return <Loading />;
          } else if (isAuthenticated) {
            return <Component {...props} />;
          }
        }}
      />
    );
  };

  const SuppliernRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (isLoading) {
            return <Loading />;
          } else if (isAuthenticated2) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/supplier/login" />;
          }
        }}
      />
    );
  };

  const Page404 = () => <code>404 PAGE NOT FOUND</code>;
  const redirect = () => <Redirect to="/admin/dashboard" />;
  return (
    <Router>
      <Route path="/supplier/login" component={SupplierLogin} />
      <Route exact path="/" component={redirect} />

      <AdminRoute path="/admin/" component={TopBar} />
      <AdminRoute path="/admin/dashboard" component={Dashboard} />
      <AdminRoute path="/admin/newsupplier" component={NewSupplier} />
      <AdminRoute path="/admin/supplierlist" component={SuppliersList} />

      <AdminRoute path="/admin/quotationslist" component={QuotationsList} />
      <AdminRoute path="/admin/newquotation" component={NewQuotation} />

      <AdminRoute path="/admin/invoicelist" component={InvoiceList} />
      <AdminRoute path="/admin/newinvoice" component={NewInvoice} />

      <SuppliernRoute path="/supplier/" component={TopBarS} />
      <SuppliernRoute
        path="/supplier/dashboard"
        component={SupplierDashboard}
      />
      {/* <Route component={Page404} /> */}
    </Router>
  );
};

export default Routes;
