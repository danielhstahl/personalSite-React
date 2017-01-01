import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandableComponent from './ExpandableComponent';
import {GridList, GridTile} from 'material-ui/GridList';
import update from 'immutability-helper';
import SelectField from 'material-ui/SelectField';
import GenericProject from './GenericProject';
import {TextFieldPositiveReals, TextFieldPositiveIntegers, TextFieldUnit} from './CustomTextFields';
const fields={
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
    speed:{
        isGood:true,
        value:.1,
        label:"Speed",
        component:TextFieldPositiveReals
    },
    volatility:{
        isGood:true,
        value:.3,
        label:"Volatility",
        component:TextFieldPositiveReals
    },
    lambda:{
        isGood:true,
        value:100,
        label:"lambda",
        component:TextFieldPositiveReals
    },
    alpha:{
        isGood:true,
        value:1.1,
        label:"alpha",
        component:TextFieldPositiveReals
    },
    shift:{
        isGood:true,
        value:1300,
        label:"Shift (Stable)",
        component:TextFieldPositiveReals
    },
    scale:{
        isGood:true,
        value:100,
        label:"Scale (Stable)",
        component:TextFieldPositiveReals
    },
    correlation:{
        isGood:true,
        value:.9,
        label:"Correlation",
        component:TextFieldUnit
    },
    StepsODE:{
        isGood:true,
        value:128, 
        label:"Steps in ODE",
        component:TextFieldPositiveIntegers
    },
    StepsX:{
        isGood:true,
        value:1024,
        label:"Steps in X",
        component:TextFieldPositiveReals
    },
    StepsU:{
        isGood:true,
        value:256,
        label:"Steps in U",
        component:TextFieldPositiveReals
    }
};
export default class OpsProject extends Component{
    render(){
        return(
            <GenericProject fields={fields}/>
        )
    }

}