import React, {PureComponent} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
const name="Daniel Stahl";
const iconSize=50;
const iconStyle={
  height:iconSize,
  width:iconSize
};
let SelectableList = makeSelectable(List);

const gridStyle={
  margin:'10px'
}
export default class Navs extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {open: false, docked:false, mql:null, selectedList:this.props.location.pathname};
  }
  componentWillMount() {
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches, open:mql.matches});
  }
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
  
  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});
  
  mediaQueryChanged=()=>{
    this.setState({docked: this.state.mql.matches, open:this.state.mql.matches});
    //this.handleToggle();
  }
  onChangeLink=(event, val)=>{
    this.setState({
      selectedList:val
    });
  }
  render() {
    return (
        <div>
        <AppBar
            title=""
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
            style={{position: 'fixed'}}
        />
        <div style={{marginLeft:this.state.docked?'300px':'0px'}}>
          {this.props.children}
        </div>
        <Drawer
            docked={this.state.docked}
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
                <img role="presentation"  style={iconStyle} src={require('./assets/icons/linkedin.svg')}/>
              </a>
          </GridTile>
          <GridTile>
          <a href='https://plus.google.com/u/0/+DanielStahl1138'>
                <img role="presentation" style={iconStyle} src={require('./assets/icons/googleplus.svg')}/>
              </a>    
          </GridTile>
          <GridTile>
          <a href='https://github.com/phillyfan1138'>
                <img role="presentation"  style={iconStyle} src={require('./assets/icons/github.svg')}/>
              </a>
            </GridTile>
        </GridList>
        
        <Divider />
          <SelectableList value={this.state.selectedList} onChange={this.onChangeLink}>
          {this.props.menuItems.map((val, index)=>{
            return(<ListItem value={val.path==="/"?val.path:"/"+val.path} key={index} onClick={!this.state.docked?this.handleClose:()=>{}} containerElement={<Link to={val.path}/>} primaryText={val.text}/> )
          })}
          </SelectableList>
        </Drawer>
      </div>
    );
  }
}