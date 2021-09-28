import React, { Component } from "react";
import dp_img from "../ball-dp.png";

class NavBar extends Component {
  styleForCount = {
    bgcolor: "red",
    marginRight: 60,
  };
  render() {
    return (
      <nav
        style={{ paddingLeft: 30 }}
        className="navbar navbar-light bg-primary"
      >
        <a className="navbar-brand" href="#">
          {/* <img
            style={{ width: 40, height: 40, marginRight: 9 }}
            src={dp_img}
          ></img> */}
          ABC Super market
        </a>
        <span
          style={this.styleForCount}
          className="badge badge-pill badge-secondary m-2"
        >
          Number of items :
          <span
            className="badge bg-secondary rounded-circle"
            style={{ fontSize: "13px", marginLeft: "5px" }}
          >
            {this.props.positiveTotalCount}
          </span>
        </span>
      </nav>
    );
  }
}

export default NavBar;
