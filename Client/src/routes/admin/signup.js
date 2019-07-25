import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";
import { images } from "../assets";
import { Signup1, Signup2, Signup3, Signup4 } from "../components/auth/signup";
import MsgAlert from "../components/other_components/msgAlert";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errmsg: null,

      password: "",
      password2: "",
      terms: false,

      //www
      formNum: 0
    };

    this._increamentForm = this._increamentForm.bind(this);
  }

  static propTypes = {
    server_state: PropTypes.object.isRequired
  };
  //############################

  //#####################################

  _increamentForm() {
    this.setState({
      formNum: this.state.formNum + 1
    });
  }

  _onChange(e) {}

  _onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Container id="login">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3 />
                </CardTitle>
              </CardHeader>
              <CardBody>
                <MsgAlert server_state={this.props.server_state} />

                <div className="form-signin-heading">
                  <img
                    src={images.simbaLogo}
                    alt="Logo"
                    className="img-responisve"
                  />
                </div>

                <br />

                {this.state.formNum === 0 ? (
                  <Signup1 _increamentForm={this._increamentForm} />
                ) : null}

                {this.state.formNum === 1 ? (
                  <Signup2 _increamentForm={this._increamentForm} />
                ) : null}

                {this.state.formNum === 2 ? (
                  <Signup3 _increamentForm={this._increamentForm} />
                ) : null}

                {this.state.formNum === 3 ? <Signup4 /> : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  server_state: state.server_state
});
export default connect(
  mapStateToProps,
  {}
)(Signup);
