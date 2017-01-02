import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import update from 'immutability-helper';
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
        var upObj={
            fields:{}
        }
        if(error){
            upObj.anyErrors={$set:true};
            upObj.fields[name]={
                isGood:{$set:false}
            };
            const newData=update(this.state, upObj);
            this.setState(newData);
        }
        else{
            upObj.fields[name]={
                isGood:{$set:true},
                value:{$set:value}
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
            
            <ExpandableComponent documentation={this.props.documentation}>

                <GridList cols={2} cellHeight='auto'>
                    <GridTile cols={2}>
                        {this.props.children}
                    </GridTile>
                    {Object.keys(this.props.fields).map((val, index)=>{
                        var actualItem=this.props.fields[val];
                        var Type=actualItem.component;
                        return(
                            <GridTile key={index}>
                                <Type 
                                    value={actualItem.value} 
                                    label={actualItem.label} 
                                    error={actualItem.errMessage}
                                    upper={actualItem.max}
                                    lower={actualItem.min}
                                    validation={(val)=>{return this.props.parseValidation(val, actualItem, this.state.fields); } }
                                    checkIfCanSubmit={
                                        (stateValue, error)=>{
                                            return this.aggregateResults(stateValue, error, val);
                                        }
                                    }
                                />
                            </GridTile>
                        );
                    })}
                </GridList>
                {this.state.anyErrors?null:<RaisedButton label="Run" onClick={()=>{
                this.props.onSubmit(this.state.fields);}}/>}
                    
            </ExpandableComponent>
        );
    }
}