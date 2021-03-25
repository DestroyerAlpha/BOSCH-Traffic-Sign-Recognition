import "./App.css";
import { Component } from "react";
import NavBar from "./Components/NavBar";
import TopBar from "./Components/TopBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data from "./Components/Data"
import CookModel from "./Components/Cook/CookModel"
import Predict from "./Components/Predict/Predict"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNav: false,
    };
  }
  render() {
    return (
      <div>
        <Router>
          <TopBar onMobileNavOpen={() => this.setState({ mobileNav: true })} />

          <NavBar
            onMobileClose={() => this.setState({ mobileNav: false })}
            openMobile={this.state.mobileNav}
          />
          <div className="rootx">
            <div className="wrapper">
              <div className="contentContainer">
                <div className="content">
                  <Switch>
                    <Route path="/data">
                      <Data />
                    </Route>
                    <Route path="/cook">
                      <CookModel />
                    </Route>
                    <Route path="/predict">
                      <Predict />
                    </Route>
                    <Route path="/dashboard">
                      1
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
