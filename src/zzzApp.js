import React, { Component } from 'react';
import { Link, hashHistory, Router,  Route} from 'react-router';
import About from './About';
import Projects from './Projects';
import Home from './Home';
import Research from './Research';
import logo from './logo.svg';
import Navs from './Navs';
import './App.css';


class App extends Component {
  render() {
    return (
      <Navs menuItems={routes}>
        {
        routes.map((val, index)=>{
          return(<Route key={index} path={val.path} component={val.component}/>);
        })
      }

      </Navs>
    );
  }
}

export default App;
