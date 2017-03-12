import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import {grey500} from 'material-ui/styles/colors';
import axios from 'axios';
 import {realValidation, integerValidation, onTypeTextField} from './UsefulProjectLambda.js';

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
    }
    onCreditSubmit=()=>{
        axios.get(`${this.props.url}/creditRisk`, {params:this.props.filterSubmission(this.state.fields)})
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
        .catch( (error)=>{
            console.log(error);
        });
        this.handleOpen();
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    onTypeTextField=(value, name)=>{
        this.setState(onTypeTextField(value, name));
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