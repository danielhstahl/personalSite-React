import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
import axios from 'axios';
const integerValidation=(number)=>{
    return number.toString().match(/^[1-9]\d*$/)?"":"Requires a positive integer";
}
const realValidation=(number)=>{
    return number.toString().match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)?"":"Requires a positive number";
}
const fields={
    t:{
        value:1,
        label:"Time Horizon",
        validationFunction:realValidation
    },
    v0:{

        value:1,
        label:"X0",
        validationFunction:realValidation
    },
    a:{

        value:.1,
        label:"Speed",
        validationFunction:realValidation
    },
    sigma:{

        value:.3,
        label:"Volatility",
        validationFunction:realValidation
    },
    lambda:{
        value:100,
        label:"lambda",
        validationFunction:realValidation
    },
    alphaStable:{
        value:1.1,
        label:"alpha",
        validationFunction:realValidation
    },
    muStable:{
        value:1300,
        label:"Shift (Stable)",
        validationFunction:realValidation
    },
    cStable:{
        value:100,
        label:"Scale (Stable)",
        validationFunction:realValidation
    },
    rho:{
        value:.9,
        label:"Correlation",
        validationFunction:realValidation
    },
    numODE:{
        value:128, 
        label:"Steps in ODE",
        validationFunction:realValidation
    },
    xNum:{
        value:1024,
        label:"Steps in X",
        validationFunction:realValidation
    },
    uNum:{
        value:256,
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
      text: 'Operational Economic Capital'
    },
    series:[{
        data:[]
    }]
    
};
export default class OpsProject extends Component{
    constructor(props){
        super(props);
        this.state={
            showProgress:true,
            showDialog:false,
            config:config,
            fields:fields
        };
    }
    onOpsSubmit=()=>{
        axios.get(`${this.props.url}/opsRisk`,  {params:this.props.filterSubmission(this.state.fields)})
        .then((response)=>{
            const vals=response.data;
            this.setState((prevState, props)=>{
                return {
                    showProgress:false,
                    config:Object.assign(prevState.config, {
                        series:[{color:grey500,  pointStart:vals.xmin, pointInterval:vals.dx, data:vals.y}]
                    })
                };
            });
        })
        .catch((error)=>{
            console.log(error);
        });
        this.handleOpen();
        //this.sendData('getCredit', 'showCreditDialog', );
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
            <CustomCard title="Operational Risk" img={require("./assets/images/operationalRisk.jpg")} >
               This project significantly extends the standard LDA operational loss framework to include correlation between severity and frequency and auto-correlation in frequency. The distribution can be recovered practically instantly even for very long tailed severity distributions.
               <GenericProject fields={this.state.fields} onRun={this.onOpsSubmit} documentation={require("./assets/pdf/OpsRiskPaper.pdf")} callback={this.onTypeTextField} />
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