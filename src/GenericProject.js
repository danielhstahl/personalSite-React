import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import update from 'immutability-helper';
import SelectField from 'material-ui/SelectField';
//import {TextFieldPositiveReals, TextFieldPositiveIntegers} from './CustomTextFields';

export default class GenericProject extends Component{
    constructor(props){
        super(props);
        this.state={
            anyErrors:false,
            fields:this.props.fields
        }
    }
    checkIfAllGood=()=>{
        return Object.keys(this.state.fields).every((val, index)=>{
            return this.state.fields[val].isGood;
        });
    }
    aggregateResults=(value, error, name)=>{
        if(error){
            var upObj={
                fields:{},
                anyErrors:{$set:true}
            };
            upObj.fields[name]={
                isGood:{$set:false}
            };
            const newData=update(this.state, upObj);
            this.setState(newData);
        }
        else{
            var upObj={
                fields:{}
            };
            upObj.fields[name]={
                isGood:{$set:true}
            };
            const newData=update(this.state, upObj);
            this.setState(newData, ()=>{
                this.setState({
                    anyErrors:!this.checkIfAllGood()
                });
            });
        }
    }
    render(){
        return(
            
            <ExpandableComponent>
                <GridList cols={2} cellHeight='auto'>
                    {Object.keys(this.props.fields).map((val, index)=>{
                        var actualItem=this.props.fields[val];
                        var Type=actualItem.component;
                        return(
                            <GridTile key={index}>
                                <Type 
                                    value={actualItem.value} 
                                    label={actualItem.label} 
                                    checkIfCanSubmit={
                                        (stateValue, error)=>{
                                            return this.aggregateResults(stateValue, error, val);
                                        }
                                    }
                                />
                            </GridTile>
                        )
                    })}
                </GridList>
                {this.state.anyErrors?null:<RaisedButton label="Run" onClick={()=>{
                this.props.onSubmit(this.state.fields, this.props.project);}}/>}
                    
            </ExpandableComponent>
        );
    }
}