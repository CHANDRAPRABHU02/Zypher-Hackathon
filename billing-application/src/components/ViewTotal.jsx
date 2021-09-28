import React, { Component } from "react";

class ViewTotal extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <h1>
              <b>ABC super market</b>
            </h1>
          </div>
        </div>
        {this.listItems()}
      </div>
      // <div style={{ position: "relative", top: 5 }}>
      //   <h1 style={{ width: "50%", paddingLeft: "13%" }}>
      //     <b>ABC super market</b>
      //   </h1>
      //   <h3 style={{ paddingLeft: "15%" }}>No:1 XYZ road , chennai.</h3>
      //   <h6 style={{ paddingLeft: "22%" }}>
      //     <b>contact no.</b> 1234567890.
      //   </h6>
      //   <ol>{this.listItems()}</ol>
      // </div>
    );
  }
  listItems = () => {
    const ans = this.props.counters
      .filter((itr) => itr.value)
      .map((itr) => (
        <div className="row">
          <div className="col">{itr.name}</div>
          <div className="col">{itr.rate}</div>
          <div className="col">{itr.value}</div>
          <div className="col">
            {/* <span
            style={{
              textAlign: "right",
              display: "inline-block",
              width: 100,
            }}
          > */}
            {itr.rate * itr.value}
          </div>
          <div
            className="col justify-content-end bg-primary"
            style={{ alignItems: "flex-end" }}
          >
            <b>
              {(
                ((100 - this.props.discountRate) * itr.rate * itr.value) /
                100
              ).toFixed(2)}
            </b>
          </div>
        </div>
      ));
    // console.log(this.props.counters);
    // return "hi";
    return ans;
  };
}

export default ViewTotal;
