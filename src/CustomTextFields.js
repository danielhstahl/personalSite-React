import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export class TextFieldPositiveIntegers extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:"",
            floatingLabelText:this.props.label
        };
    }
    isPositiveInteger=(numberAsString)=>{
        return numberAsString.match(/^[1-9]\d*$/);
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.isPositiveInteger(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:"Only Positive Integer"
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);});
    }
    render(){
        return(
            <TextField defaultValue={this.state.value}
                onChange={this.onChange}
                floatingLabelText={this.props.label}
                errorText={this.state.error}
            />
        )
    }

}
export class TextFieldPositiveReals extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:""
        };
    }
    isPositiveReal=(numberAsString)=>{
        return numberAsString.match(/^[+]?([.]\d+|\d+([.]\d+)?)$/);
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.isPositiveReal(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:"Only Positive Number"
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);});
    }
    render(){
        return(
            <TextField defaultValue={this.state.value}
                onChange={this.onChange}
                floatingLabelText={this.props.label}
                errorText={this.state.error}
            />
        )
    }

}