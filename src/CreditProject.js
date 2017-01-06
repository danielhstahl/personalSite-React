import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
//import {TextFieldGeneric} from './CustomTextFields';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
const integerValidation=(number)=>{
    return number.toString().match(/^[1-9]\d*$/)?"":"Requires a positive integer";
}
const realValidation=(number)=>{
    return number.toString().match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)?"":"Requires a positive number";
}

/*These keys are the same keys in the c++ code!*/
const fields={
    n:{
        value:100000,
        label:"Number of Assets",
        validationFunction:integerValidation
    },
    t:{
        value:1,
        label:"Time Horizon",
        validationFunction:realValidation
    },
    xO:{
        value:1,
        label:"X0",
        validationFunction:realValidation
    },
    alpha:{
        value:.1,
        label:"Systemic Drift",
        validationFunction:realValidation
    },
    sigma:{
        value:.3,
        label:"Systemic Volatility",
        validationFunction:realValidation
    },
    q:{
        value:.05,
        label:"q",
        validationFunction:realValidation
    },
    lambda:{
        value:.05,
        label:"lambda",
        validationFunction:realValidation
    },
    xNum:{
        value:1024,
        label:"Steps in X",
        validationFunction:realValidation
    },
    uNum:{
        value:128,
        label:"Steps in U",
        validationFunction:realValidation
    }
};
const config={
    chart: {
        type: 'line'
    },
    credits:{
        enabled:false
    },
    legend:{
      enabled:false
    },
    title: {
      text: 'Credit Economic Capital'
    },
    series:[{
        data:[]
    }]
    
};

export default class CreditProject extends Component{
    constructor(props){
        super(props);
        this.state={
            showProgress:true,
            showDialog:false,
            config:config,
            fields:fields
        };
        this.props.ws.on('creditRisk-data', (msg)=>{
            var vals=JSON.parse(msg);
            var shadowObj={
                showProgress:{$set:false},
                config:{
                    series:[{$set:{color:grey500,  pointStart:vals.xmin, pointInterval:vals.dx, data:vals.y}}]
                }
            };
            const updateConfig=update(this.state, shadowObj);
            this.setState(updateConfig);
        });
    }
    
    onCreditSubmit=()=>{
        this.props.ws.emit('getCredit', this.props.filterSubmission(this.state.fields));
        this.handleOpen();
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    onTypeTextField=(value, name)=>{
        var upObj={
            fields:{}
        }
        upObj.fields[name]={
            value:{$set:value}
        };
        const newData=update(this.state, upObj);
        this.setState(newData);
    };
    render(){
        return(
            <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
               This project shows how to compute the distribution of a credit portfolio of defaultable assets with stochastic PD and LGD.  It includes full granularity and efficient computation.
              <GenericProject fields={this.state.fields} onRun={this.onCreditSubmit} documentation={require("./assets/pdf/CreditRiskPaper.pdf")} callback={this.onTypeTextField} />
              
              
              <Dialog
                modal={false}
                open={this.state.showDialog}
                onRequestClose={this.handleClose}
                >
                {this.state.showProgress?
                    <CircularProgress size={80} thickness={5} />:
                    <ReactHighcharts config={this.state.config}></ReactHighcharts>}
                </Dialog>
            </CustomCard>
        );
    }

}