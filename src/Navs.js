import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import {grey700, grey800, grey500} from 'material-ui/styles/colors';
import Flexbox from 'flexbox-react';
const name="Daniel Stahl";
const iconSize=50;
const iconStyle={
  height:iconSize,
  width:iconSize
};
import Divider from 'material-ui/Divider';
/*const offStyle={
  backgroundColor:grey800, 
  color:grey500
}
const mainStyle={
  backgroundColor:grey700, 
  color:grey500
}*/
const gridStyle={
  margin:'10px'
}
export default class Navs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
        <div>
        <AppBar
            title=""
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
            docked={false}
            width={255}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
        >
        <GridList  cols={3} cellHeight='auto' style={gridStyle}>
          <GridTile
            cols={1}
              
          >
          <Avatar size={iconSize} src={require('./assets/images/avatar.png')} />
          </GridTile>
          <GridTile cols={2}>
          <h2 style={{ marginTop:'10px', marginBottom:'0px'}}>{name}</h2>
          </GridTile>
          <GridTile>
          <a href='https://www.linkedin.com/profile/view?id=AAIAAAYja3AB_fq6IhUtF5CBw1yjTHheP8YIooE&trk=nav_responsive_tab_profile'>
                <img style={iconStyle} src={require('./assets/icons/linkedin.svg')}/>
              </a>
          </GridTile>
          <GridTile>
          <a href='https://plus.google.com/u/0/+DanielStahl1138'>
                <img style={iconStyle} src={require('./assets/icons/googleplus.svg')}/>
              </a>    
          </GridTile>
          <GridTile>
          <a href='https://github.com/phillyfan1138'>
                <img style={iconStyle} src={require('./assets/icons/github.svg')}/>
              </a>
            </GridTile>
        </GridList>
        
        <Divider />
          {this.props.menuItems.map((val, index)=>{
            return(<MenuItem key={index} onTouchTap={this.handleClose} containerElement={<Link to={val.path}/>} primaryText={val.text}/> )
          })}

        </Drawer>
      </div>
    );
  }
}