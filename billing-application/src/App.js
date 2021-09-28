import React, { Component } from "react";
import QrReader from "react-qr-reader";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";
import InputForm from "./components/input";
import ViewTotal from "./components/ViewTotal";

import Counter from "./components/counter";
import { render } from "@testing-library/react";
const FinalRates = {
  apple: 43,
};

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1, name: "Milk", rate: 25, isRateEdit: false },
      { id: 2, value: 0, name: "GoodDay", rate: 20, isRateEdit: false },
      { id: 3, value: 2, name: "Bread", rate: 10, isRateEdit: false },
      { id: 4, value: 0, name: "Fruits", rate: 140, isRateEdit: false },
      { id: 5, value: 0, name: "Vegetables", rate: 75, isRateEdit: false },
    ],
    newId: 6,
    items: ["apple", "banana", "grape"],
    discountRate: 0,
    finalTotal: 0,
  };
  resetAll = () => {
    const counters = [...this.state.counters];
    counters.map((itr) => {
      itr.value = 0;
    });
    this.setState(counters);
    // console.log(counters);
  };

  changeTotal = () => {
    var newTotal = 0;
    this.state.counters
      .filter((itr) => itr.value)
      .map((itr) => {
        newTotal +=
          ((100 - this.state.discountRate) * itr.rate * itr.value) / 100;
      });
    // console.log(newTotal);
    return newTotal.toFixed(2);
  };

  appendItem = (itemName, itemRate) => {
    // console.log(itemName);
    let counters = [
      ...this.state.counters,
      {
        id: this.state.newId++,
        value: 0,
        name: itemName,
        rate: itemRate,
        isRateEdit: false,
      },
    ];
    this.setState({ counters });
    // console.log(counters);
  };
  changeRate = (newRate, gnId) => {
    if (!newRate || newRate < 1) {
      alert("Invalid Rate !!!");
      return;
    }
    // console.log(newRate, gnId);
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.rate = newRate;
    });
    this.setState(counters);
    this.toggleRate(gnId);
  };

  toggleRate = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.isRateEdit = !itr.isRateEdit;
    });
    this.setState(counters);
  };

  increaseValue = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.value++;
    });
    this.setState(counters);
  };

  decreaseValue = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId && itr.value > 0) itr.value--;
    });
    this.setState(counters);
  };

  deleteItem = (deleteId) => {
    const newCounter = this.state.counters.filter((itr) => itr.id !== deleteId);
    this.setState({ counters: newCounter });
    // console.log();
  };

  findTodayDiscount = () => {
    const val = Math.round(Math.random() * 50) % 51;
    this.state.discountRate = val;
    // alert("Your discount is " + this.state.discountRate);
  };
  handleScan = (e) => {
    console.log(e);
    if (!e) {
      return;
    }
    this.appendItem(e, FinalRates[e]);
  };
  render() {
    return (
      <div className="container-fluid">
        <NavBar
          positiveTotalCount={
            this.state.counters.filter((itr) => itr.value).length
          }
        />
        <div>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "10vw", height: "10vh" }}
          />
          <p>{this.state.result}</p>
        </div>
        <div className="row">
          <div className="col-6">
            <main className="container">
              <InputForm appendItem={this.appendItem} />
              <Counters
                counters={this.state.counters}
                items={this.state.items}
                resetAll={this.resetAll}
                increaseValue={this.increaseValue}
                decreaseValue={this.decreaseValue}
                deleteItem={this.deleteItem}
                changeRate={this.changeRate}
                toggleRate={this.toggleRate}
              />
            </main>
          </div>
          <div className="col-6 bg-secondary">
            <ViewTotal
              counters={this.state.counters}
              discountRate={this.state.discountRate}
            />
            <b>
              Total :
              <span
                style={{
                  display: "inline-block",
                  textAlign: "right",
                  width: 100,
                }}
              >
                {this.changeTotal()}
              </span>
            </b>
            {/* <button>hi</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
