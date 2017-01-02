import React, { Component } from 'react';
import GenericProject from './GenericProject';
import {TextFieldPositiveReals, TextFieldPositiveIntegers, TextFieldUnit} from './CustomTextFields';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
const fields={
    t:{
        isGood:true,
        value:1,
        label:"Time Horizon",
        component:TextFieldPositiveReals
    },
    v0:{
        isGood:true,
        value:1,
        label:"X0",
        component:TextFieldPositiveReals
    },
    a:{
        isGood:true,
        value:.1,
        label:"Speed",
        component:TextFieldPositiveReals
    },
    sigma:{
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
    alphaStable:{
        isGood:true,
        value:1.1,
        label:"alpha",
        component:TextFieldPositiveReals
    },
    muStable:{
        isGood:true,
        value:1300,
        label:"Shift (Stable)",
        component:TextFieldPositiveReals
    },
    cStable:{
        isGood:true,
        value:100,
        label:"Scale (Stable)",
        component:TextFieldPositiveReals
    },
    rho:{
        isGood:true,
        value:.9,
        label:"Correlation",
        component:TextFieldUnit
    },
    numODE:{
        isGood:true,
        value:128, 
        label:"Steps in ODE",
        component:TextFieldPositiveIntegers
    },
    xNum:{
        isGood:true,
        value:1024,
        label:"Steps in X",
        component:TextFieldPositiveReals
    },
    uNum:{
        isGood:true,
        value:256,
        label:"Steps in U",
        component:TextFieldPositiveReals
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
            config:config
        };
        this.props.ws.on('opsRisk-data', (msg)=>{
            var vals=JSON.parse(msg);
            console.log(vals);
            var shadowObj={
                showProgress:{$set:false},
                config:{
                    series:[{$set:{color:grey500,  pointStart:vals.xmin, pointInterval:vals.dx, data:vals.y}}]
                }
            };
            const updateConfig=update(this.state, shadowObj);
            console.log(updateConfig);
            this.setState(updateConfig);
        });
    }
    onOpsSubmit=(submission)=>{
        this.props.ws.emit('getOps', this.props.filterSubmission(submission));
        this.handleOpen();
        //this.sendData('getCredit', 'showCreditDialog', );
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    render(){
        return(
            <CustomCard title="Operational Risk" img={require("./assets/images/operationalRisk.jpg")} >
               This project significantly extends the standard LDA operational loss framework to include correlation between severity and frequency and auto-correlation in frequency. The distribution can be recovered practically instantly even for very long tailed severity distributions.
               <GenericProject fields={fields} onSubmit={this.onOpsSubmit}/>
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