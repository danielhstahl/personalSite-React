import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './About';
import Projects from './Projects';
import Research from './Research';
import Navs from './Navs';
import './index.css';
import { Link, hashHistory, Router,  Route} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {grey800, grey500} from 'material-ui/styles/colors';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();



//$color-primary: $palette-grey-500;
//mdl-color--grey-800


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey500,
    primary2Color: grey800,
    primary3Color: grey500,
    /*accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,*/
  },
  appBar: {
    height: 50,
  },
});
/*<AppBar title="My AppBar" />*/

const routes=[
  {path:"/", component:App, text:"Home"},
  {path:"/about", component:About, text:"About"},
  {path:"/projects", component:Projects, text:"Projects"},
  {path:"/research", component:Research, text:"Research"}
];

ReactDOM.render((
  
 <MuiThemeProvider muiTheme={muiTheme}>
 <div>
    <Navs menuItems={routes}/>
    <Router history={hashHistory}>
      
      {
        routes.map((val, index)=>{
          return(<Route key={index} path={val.path} component={val.component}/>);
        })
      }
    </Router>
    
    </div>
  </MuiThemeProvider>

  
), document.getElementById('root'));
/*ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/
