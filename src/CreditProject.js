import React, { Component } from 'react';
import GenericProject from './GenericProject';
import {TextFieldPositiveReals, TextFieldPositiveIntegers} from './CustomTextFields';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
/*These keys are the same keys in the c++ code!*/
const fields={
    n:{
        isGood:true,
        value:100000,
        label:"Number of Assets",
        component:TextFieldPositiveIntegers
    },
    t:{
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
    alpha:{
        isGood:true,
        value:.1,
        label:"Systemic Drift",
        component:TextFieldPositiveReals
    },
    sigma:{
        isGood:true,
        value:.3,
        label:"Systemic Volatility",
        component:TextFieldPositiveReals
    },
    q:{
        isGood:true,
        value:.05,
        label:"q",
        component:TextFieldPositiveReals
    },
    lambda:{
        isGood:true,
        value:.05,
        label:"lambda",
        component:TextFieldPositiveReals
    },
    xNum:{
        isGood:true,
        value:1024,
        label:"Steps in X",
        component:TextFieldPositiveReals
    },
    uNum:{
        isGood:true,
        value:128,
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
            config:config
        };
        this.props.ws.on('creditRisk-data', (msg)=>{
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
    onCreditSubmit=(submission)=>{
        this.props.ws.emit('getCredit', this.props.filterSubmission(submission));
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
            <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
               This project shows how to compute the distribution of a credit portfolio of defaultable assets with stochastic PD and LGD.  It includes full granularity and efficient computation.
              <GenericProject fields={fields} onSubmit={this.onCreditSubmit}/>
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