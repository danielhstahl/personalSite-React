import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import update from 'immutability-helper';
import {TextFieldGeneric} from './CustomTextFields';

const checkIfAllGood=(fields, parseValidation)=>{
    return Object.keys(fields).every((val, index)=>{
        const item=fields[val];
        return parseValidation?parseValidation(item.value, item, fields)==="":item.validationFunction(item.value)==="";
    });
}
export const GenericProject =({fields, documentation, onRun, callback, parseValidation, children})=>
     <ExpandableComponent documentation={documentation}>
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
                            callback={(value)=>{return callback(value, val);}}
                        />
                    </GridTile>
                );
            })}
        </GridList>
        {checkIfAllGood(fields, parseValidation)?<RaisedButton label="Run" onClick={onRun}/>:null}
            
    </ExpandableComponent>
