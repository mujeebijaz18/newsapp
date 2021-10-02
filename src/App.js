import './App.css';
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_PLANET_API;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height="2px"
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={20} category={'general'} />
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="busiess" pageSize={20} category={'business'} />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={20} category={'entertainment'} />
            </Route>
            <Route exact path="/general">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={20} category={'general'} />
            </Route>
            <Route path="/health">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={20} category={'health'} />
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={20} category={'science'} />
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={20} category={'sports'} />
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={20} category={'technology'} />
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}


