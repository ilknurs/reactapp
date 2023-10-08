import React, { Component } from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";
import axios from "axios";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

class User extends Component {
  static defaultProps = {
    name: "Bilgi Yok",
    salary: "Bilgi Yok",
    department: "Bilgi Yok",
  };
  state = {
    isVisible: false,
  };

  // Arrow func
  onClickEvent = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  onDeleteUser = async (dispatch, e) => {
    const { id } = this.props;

    // Delete Request
    //Rest api'dan kalkıcak
    await axios.delete(`http://localhost:3004/users/${id}`);

    // Consumer Dispatch
    //State'den kalkıcak
    dispatch({ type: "DELETE_USER", payload: id });
  };

  componentWillUnmount() {
    console.log("Component Will UnMount");
  }
  render() {
    const { id, name, department, salary } = this.props;
    const { isVisible } = this.state;

    return (
      <UserConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="col-md-8 mb-4">
              <div
                className="card"
                style={
                  isVisible
                    ? { backgroundColor: "#62848d", color: "whitesmoke" }
                    : null
                }
              >
                <div className="card-header d-flex justify-content-between">
                  <h4 className="d-inline" onClick={this.onClickEvent}>
                    {name}
                  </h4>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => this.onDeleteUser(dispatch)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                {isVisible ? (
                  <div className="card-body">
                    <p className="card-text">Maaş : {salary}</p>
                    <p className="card-text">Departman : {department}</p>
                    <Link to = {`edit/${id}`} className = "btn btn-dark btn-block"> Update User </Link>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default User;
