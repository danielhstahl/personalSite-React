import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link} from 'react-router';
import {CustomCard} from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';
import {GridList} from 'material-ui/GridList';

import ActionDescription from 'material-ui/svg-icons/action/description';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';

export default class ExpandableComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            hidden:true
        };
    }
    toggleHidden=()=>{
        this.setState({
            hidden:!this.state.hidden
        });
    }

    render(){
        return(<div>
        <IconButton
            tooltip="Show Form"
            onClick={this.toggleHidden}
        >
            {this.state.hidden?<HardwareKeyboardArrowDown/>:<HardwareKeyboardArrowUp/>}
            
        </IconButton>

        <IconButton
            tooltip="Documentation"
            onClick={this.toggleHidden}
        >
            <ActionDescription/>
            
        </IconButton>

        {this.state.hidden?null:this.props.children}
        </div>);

    }
}