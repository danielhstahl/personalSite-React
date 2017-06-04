import React, { PureComponent } from 'react';
import ActionDescription from 'material-ui/svg-icons/action/description';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';

export default class ExpandableComponent extends PureComponent{
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
            href={this.props.documentation}
        >
            <ActionDescription/>
            
        </IconButton>

        {this.state.hidden?null:this.props.children}
        </div>);

    }
}