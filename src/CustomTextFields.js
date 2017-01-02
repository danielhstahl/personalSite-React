import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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

export class TextFieldUnit extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:"",
        };
    }
    isOnUnit=(numberAsString)=>{
        return numberAsString.match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)&&parseFloat(numberAsString)<=1.0;
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.isOnUnit(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:"Only Number in [0, 1]"
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

export class TextFieldBoundedInteger extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:""
        };
    }
    isBetweenNumbers=(numberAsString)=>{
        const parsedVal=parseFloat(numberAsString);
        return numberAsString.match(/^[1-9]\d*$/)&&parsedVal<=this.props.upper&&parsedVal>=this.props.lower;
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.isBetweenNumbers(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:"Only Number in ["+this.props.lower+", "+this.props.upper+"]"
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);});
    }
    render(){
        return(
            <TextField defaultValue={this.props.value}
                onChange={this.onChange}
                floatingLabelText={this.props.label}
                errorText={this.state.error}
            />
        )
    }

}


export class TextFieldBoundedReal extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:""
        };
    }
    isBetweenNumbers=(numberAsString)=>{
        const parsedVal=parseFloat(numberAsString);
        return numberAsString.match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)&&parsedVal<=this.props.upper&&parsedVal>=this.props.lower;
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.isBetweenNumbers(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:"Only Number in ["+this.props.lower+", "+this.props.upper+"]"
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);});
    }
    render(){
        return(
            <TextField defaultValue={this.props.value}
                onChange={this.onChange}
                floatingLabelText={this.props.label}
                errorText={this.state.error}
            />
        )
    }

}


export class TextFieldGeneric extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:""
        };
    }
    checkNumber=(numberAsString)=>{
        const parsedVal=parseFloat(numberAsString);
        return numberAsString.match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)&&this.props.validation(parsedVal);
    }
    onChange=(event)=>{
        var value=event.target.value;
        this.checkNumber(value)?
        this.setState({
            error:"",
            value:parseFloat(value)
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);}):
        this.setState({
            error:this.props.error
        },
        ()=>{this.props.checkIfCanSubmit(this.state.value, this.state.error);});
    }
    render(){
        return(
            <TextField defaultValue={this.props.value}
                onChange={this.onChange}
                floatingLabelText={this.props.label}
                errorText={this.state.error}
            />
        )
    }

}

export class SelectFieldWrapped extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value,
            error:""
        };
    }
    onChange=(event, index, value)=>{
        this.setState({value:value},
        ()=>{
            this.props.checkIfCanSubmit(this.state.value, "");
        }
        );
    }
    render(){
        return(
        <SelectField
            floatingLabelText={this.props.label}
            value={this.state.value}
            onChange={this.onChange}
        >
        {this.props.items.map((val, index)=>{
            return(<MenuItem value={val.value} primaryText={val.label}/>);
        })}
        </SelectField>);
    }
}