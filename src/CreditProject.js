import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import SelectField from 'material-ui/SelectField';
import {TextFieldPositiveReals, TextFieldPositiveIntegers} from './CustomTextFields'
export default class CreditProject extends Component{
    constructor(props){
        super(props);
        this.state={
            anyErrors:false,
            fields:{
                numAssets:{
                    isGood:true,
                    value:100000,
                    label:"Number of Assets",
                    component:TextFieldPositiveIntegers
                },
                timeHorizon:{
                    isGood:true,
                    value:1,
                    label:"Time Horizon",
                    component:TextFieldPositiveReals
                },
                xO:{
                    isGood:true,
                    value:1,
                    label:"X0",
                    component:TextFieldPositiveReals
                },
                systemicDrift:{
                    isGood:true,
                    value:.1,
                    label:"Systemic Drift",
                    component:TextFieldPositiveReals
                },
                systemicVol:{
                    isGood:true,
                    value:.3,
                    label:"Systemic Volatility",
                    component:TextFieldPositiveReals
                },
                q:{
                    isGood:true,
                    value:.05,
                    label:"q",
                    component:TextFieldPositiveReals
                },
                lambda:{
                    isGood:true,
                    value:.05,
                    label:"lambda",
                    component:TextFieldPositiveReals
                },
                StepsX:{
                    isGood:true,
                    value:1024,
                    label:"Steps in X",
                    component:TextFieldPositiveReals
                },
                StepsU:{
                    isGood:true,
                    value:128,
                    label:"Steps in U",
                    component:TextFieldPositiveReals
                }
            }
        }
    }
    checkIfAllGood=()=>{
        return Object.keys(this.state.fields).every((val, index)=>{
            return val.isGood;
        });
    }
    aggregateResults=(value, error, name)=>{
        var fields=this.state.fields;
        fields[name].value=value;
        if(error){
            fields[name].isGood=false;
            
            this.setState({
                fields:fields,
                anyErrors:true
            });
        }
        else{
            fields[name].isGood=true;
            this.setState({
                fields:fields,
                anyErrors:this.checkIfAllGood()
            });
        }
    }
    render(){
        return(
            
            <ExpandableComponent>
                <GridList cols={4} cellHeight='auto'>
                    {Object.keys(this.state.fields).map((val, index)=>{
                        var actualItem=this.state.fields[val];
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
                {this.state.anyErrors?null:<RaisedButton label="Submit"/>}
                    
            </ExpandableComponent>
        );
    }
}