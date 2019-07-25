import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";

import { loadMessages } from "../../js/actions/messageActions";
import TopNav from "../../components/admin/layout_components/topNav";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMessages());
  }, []);

  return (
    <>
      <Container fixed style={{ marginTop: "100px" }}>
        <TopNav />

        <p>
          Operating successfully in an increasingly demanding and competitive
          market, requires a significant effort of involvement and support of
          our suppliers. PowerDrive periodically releases invitation for bids
          open to all suppliers, advertising them in newspapers. In order to
          achieve transparency and fairness, and to ensure that the best
          suppliers in the market are consulted, PowerDrive has started a
          suppliers qualification procedure. As part of the qualification
          process, we developed this 'Suppliers Portal' where bids will be
          announced. The access to bids information will be available only to
          qualified suppliers, that is, the suppliers registered on the Portal
          and able to meet the eligibility criteria required by PowerDrive.
        </p>
      </Container>
    </>
  );
};

export default Dashboard;
