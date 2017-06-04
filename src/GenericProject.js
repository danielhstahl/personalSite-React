import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import {TextFieldGeneric} from './CustomTextFields';

const checkIfAllGood=(fields, parseValidation)=>{
    return Object.keys(fields).every((val, index)=>{
        const item=fields[val];
        return parseValidation?parseValidation(item.value, item, fields)==="":item.validationFunction(item.value)==="";
    });
}
export class GenericProject extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.fields!==this.props.fields||nextProps.parseValidation!==this.props.parseValidation||nextProps.children!==this.props.children
    }
    render(){
        const {fields, documentation, onRun, callback, parseValidation, children}=this.props
        return <ExpandableComponent documentation={documentation}>
            <GridList cols={2} cellHeight='auto'>
                <GridTile cols={2}>
                    {children}
                </GridTile>
                {Object.keys(fields).map((val, index)=>{
                    const actualItem=fields[val];
                    return(
                        <GridTile key={index}>
                            <TextFieldGeneric 
                                value={actualItem.value} 
                                label={actualItem.label}  
                                errorMsg={parseValidation?parseValidation(actualItem.value, actualItem, fields):actualItem.validationFunction(actualItem.value)}
                                callback={value=>callback(value, val)}
                            />
                        </GridTile>
                    );
                })}
            </GridList>
            {checkIfAllGood(fields, parseValidation)?<RaisedButton label="Run" onClick={onRun}/>:null}
                
        </ExpandableComponent>
    }
}
