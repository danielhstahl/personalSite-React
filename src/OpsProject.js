import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ChartDialog from './ChartDialog'
import {grey500} from 'material-ui/styles/colors';
import {realValidation, onTypeTextField, getLambda} from './UsefulProjectLambda.js';

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
    }],
    yAxis:{
        min:0
    }
    
};

const manageConfig=(vals)=>{
    return Object.assign({}, config, {
        series:[{color:grey500,  pointStart:vals.xmin, pointInterval:vals.dx, data:vals.y}]
    })
}
export default class OpsProject extends Component{
    
    state={
        showDialog:false,
        config:null,
        fields:fields
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState!==this.state
    }
    onOpsSubmit=()=>{
        const {url, filterSubmission}=this.props
        const {fields}=this.state
        getLambda(url, "opsRisk", filterSubmission(fields), (vals)=>{
            this.setState({
                config:manageConfig(vals)
            })
        })
        this.handleOpen();
    }
    handleOpen = () => {
        this.setState({showDialog: true, config:null});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    onTypeTextField=(value, name)=>{
        this.setState(onTypeTextField(value, name));
    };
    render(){
        const {fields,  showDialog,  config}=this.state
        return(
            <CustomCard title="Operational Risk" img={require("./assets/images/operationalRisk.jpg")} >
               This project significantly extends the standard LDA operational loss framework to include correlation between severity and frequency and auto-correlation in frequency. The distribution can be recovered practically instantly even for very long tailed severity distributions.
               <GenericProject fields={fields} onRun={this.onOpsSubmit} documentation={require("./assets/pdf/OpsRiskPaper.pdf")} callback={this.onTypeTextField} />
               <ChartDialog showDialog={showDialog} config={config} handleClose={this.handleClose}/>
            </CustomCard>
        );
    }

    

}