import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Alert } from "reactstrap";
import Sidebar from "../components/layout_components/sidebar";
import MyProfile from "../components/other_components/profile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errmsg: null,

      contentSize: "content-wrapper"
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._toggleContentSize = this._toggleContentSize.bind(this);
  }

  static propTypes = {
    error: PropTypes.object.isRequired
  };

  _onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _onSubmit(e) {
    e.preventDefault();
  }

  _toggleContentSize(size) {
    this.setState({
      contentSize: size
    });
  }

  componentDidUpdate(prevProps) {
    const { error, auth, student } = this.props;

    if (error !== prevProps.error) {
      // Check for register error

      if (error.id === "LOGOUT_FAIL") {
        this.setState({
          errmsg: error.msg
        });
      } else {
        this.setState({
          errmsg: null
        });
      }
    }
  }

  render() {
    return (
      <main className="cd-main-content">
        <Sidebar
          _toggleContentSize={this._toggleContentSize}
          location={this.props.location}
        />

        <div id="pagewrapper" className={this.state.contentSize}>
          {this.state.errmsg ? (
            <Alert color="danger"> {this.state.errmsg}</Alert>
          ) : null}
          <Row>
            <Col md={{ size: "8", offset: "2" }} className="card-col">
              <MyProfile />
            </Col>
          </Row>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});
export default connect(
  mapStateToProps,
  {}
)(Profile);
