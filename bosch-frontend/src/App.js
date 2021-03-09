import "./App.css";
import { Component } from "react";
import NavBar from "./Components/NavBar";
import TopBar from "./Components/TopBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data from "./Components/Data"

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
          <div className="root">
            <div className="wrapper">
              <div className="contentContainer">
                <div className="content">
                  <Switch>
                    <Route path="/data">
                      <Data />
                    </Route>
                    <Route path="/cook">hello man</Route>
                    <Route path="/predict">4</Route>
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
