import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ChartDialog from './ChartDialog'
import {grey500} from 'material-ui/styles/colors';
 import {realValidation, integerValidation, onTypeTextField, getLambda} from './UsefulProjectLambda.js';

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
    }],
    yAxis:{
        min:0
    }
    
};
const manageConfig=(vals)=>{
    return Object.assign(config, {
        series:[{color:grey500,  pointStart:vals.xmin, pointInterval:vals.dx, data:vals.y}]
    })
}
export default class CreditProject extends Component{
    state={
        showDialog:false,
        config:null,
        fields:fields
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState!==this.state
    }
    onCreditSubmit=()=>{
        const {filterSubmission, url}=this.props
        const {fields}=this.state
        getLambda(url, "creditRisk", filterSubmission(fields), (vals)=>{
            this.setState({
                config:manageConfig(vals)
            })
        })
        this.handleOpen()
    }
    handleOpen = () => {
        this.setState({showDialog: true, showProgress:true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    onTypeTextField=(value, name)=>{
        this.setState(onTypeTextField(value, name));
    };
    render(){
        const {fields, showDialog, config}=this.state
        return(
            <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
               This project shows how to compute the distribution of a credit portfolio of defaultable assets with stochastic PD and LGD.  It includes full granularity and efficient computation.
              <GenericProject fields={fields} onRun={this.onCreditSubmit} documentation={require("./assets/pdf/CreditRiskPaper.pdf")} callback={this.onTypeTextField} />
              <ChartDialog showDialog={showDialog} config={config} handleClose={this.handleClose}/>
            </CustomCard>
        );
    }

}