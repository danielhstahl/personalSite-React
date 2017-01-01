import {GridList, GridTile} from 'material-ui/GridList';
import React, { Component } from 'react';
const gridStyle={
    marginTop:'75px',
    marginLeft:'50px',
    marginRight:'50px',
};

export class CustomGridList extends Component{
    render(){
        return(<GridList cols={1} cellHeight='auto'>
            {this.props.children}
        </GridList>);
    }
}
export class CustomGrid extends Component{
    render(){
       return(<GridTile style={gridStyle}>
            {this.props.children}
       </GridTile>);
            
    }
}
