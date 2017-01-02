import React, { Component } from 'react';
import GenericProject from './GenericProject';
import {TextFieldPositiveReals, TextFieldBoundedInteger,  TextFieldGeneric, TextFieldPositiveIntegers, TextFieldBoundedReal} from './CustomTextFields';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const startingAsset=0;

const checkValidation=(val, item, obj)=>{
    //const item=obj1[name];
    if(item.validation){
        const otherKey=item.depends||"";
        const val2=otherKey?obj[otherKey].value:0;
        return item.validation(val, val2);
    }
    return true;
}

const standardFields={
    n:{
        label:"# of simulations",
        value:1000,
        min:50,
        max:100000,
        isGood:true,
        component:TextFieldBoundedInteger
    },
    sigma:{
        label:"Volatility",
        value:0.04,
        min:0.01,
        max:0.1,
        isGood:true,
        component:TextFieldBoundedReal
    },
    a:{
        label:"Mean Reversion",
        value:0.2,
        min:0.01,
        max:0.5,
        isGood:true,
        component:TextFieldBoundedReal
    },
    t:{
        label:"Simulate to (in days)",
        value:10,
        min:1,
        max:30,
        isGood:true,
        component:TextFieldPositiveIntegers
    }
};
const assets=[{
    label:"Bond",
    value:0,
    params:Object.assign({
        T:{
        label:"Maturity (years)",
        value:1,
        depends:"t",
        validation:function(val, val1){
            return val*360>val1;
        },
        isGood:true,
        component:TextFieldGeneric,
        errMessage:"Required > \"Simulate to date\""
    }}, standardFields)
},{
    label:"Euro Dollar Future",
    value:1,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"Bond Call (Zero Coupon)",
    value:3,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return  val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        Tm:{
            label:"Underlying Maturity",
            value:1.25,
            depends:"T",
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > Maturity"
        },
        k:{
            label:"Strike",
            value:.97,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"Bond Put (Zero Coupon)",
    value:4,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        Tm:{
            label:"Underlying Maturity",
            value:1.25,
            depends:"T",
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > Maturity"
        },
        k:{
            label:"Strike",
            isGood:true,
            value:.97,
            validation:function(val, val1){
                return  val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"Caplet",
    value:7, 
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            isGood:true,
            validation:function(val, val1){
                return  val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        },
        k:{
            label:"Strike",
            value:.02,
            isGood:true,
            validation:function(val, val1){
                return  val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"Swap",
    value:8,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return  val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        },
        k:{
            label:"Swap Rate",
            value:.02,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"Swaption",
    value:9,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return  val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            isGood:true,
            validation:function(val, val1){
                return  val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        },
        Tm:{
            label:"Underlying Maturity",
            value:6,
            depends:"T",
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > Maturity"
        },
        k:{
            label:"Strike",
            value:.03,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
},{
    label:"American Swaption (Warning: slower solution)",
    value:10,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            isGood:true,
            validation:function(val, val1){
                return val*360>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > \"Simulate to date\""
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        },
        Tm:{
            label:"Underlying Maturity",
            value:6,
            depends:"T",
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > Maturity"
        },
        k:{
            label:"Strike",
            value:.03,
            isGood:true,
            validation:function(val, val1){
                return val>val1;
            },
            component:TextFieldGeneric,
            errMessage:"Required > zero"
        }
    }, standardFields)
}];

const config={
    chart: {
        type: 'column',
        marginRight: 10
    },
    plotOptions: {
        series: {
            groupPadding: 0,
            pointPadding: 0,
            borderWidth: 0
        }
    },
    credits:{
        enabled:false
    },
    legend:{
      enabled:false
    },
    title: {
      text: 'Histogram of Prices'
    },
    xAxis:{
        categories:""
    },
    series:[{
        data:[]
    }]
    
};
const getSubFields=(value, obj)=>{
    return obj.find((element)=>{
        return value===element.value;
    });
}
export default class MarketProject extends Component{
    constructor(props){
        super(props);
        this.state={
            showProgress:true,
            showDialog:false,
            config:config,
            selectedAsset:startingAsset,
            fields:getSubFields(startingAsset, assets).params
        };
        this.props.ws.on('marketRisk-data', (msg)=>{
            var vals=JSON.parse(msg);
            if(!vals.Spot&&!vals.Forward){
                var shadowObj={
                    showProgress:{$set:false},
                    config:{
                        xAxis:{
                            categories:{$set:vals.bins}
                        },
                        series:[{$set:{color:grey500,  data:vals.count}}]
                    }
                };
                const updateConfig=update(this.state, shadowObj);
                this.setState(updateConfig);
            }
        });
    }
    onMarketSubmit=(submission)=>{
        var myObj=this.props.filterSubmission(submission);
        myObj.asset=this.state.selectedAsset;
        this.props.ws.emit('getMarket', myObj);
        this.handleOpen();
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    onChange=(event, index, value)=>{
        const shadowObj={
            selectedAsset:{$set:value},
            fields:{
                $set:getSubFields(value, assets).params
            }
        };
        const updateConfig=update(this.state, shadowObj);
        this.setState(updateConfig);
    }
    render(){
        return(
            <CustomCard title="Market Risk" img={require("./assets/images/marketRisk.jpg")} >
               This project shows a Monte Carlo simulation (featuring C++ backend) for the distribution of a variety of assets.
              <GenericProject fields={this.state.fields} onSubmit={this.onMarketSubmit} parseValidation={checkValidation} documentation="assets/pdf/MarketRiskDocumentation.pdf">
                <SelectField
                    floatingLabelText="Select an Asset"
                    value={this.state.selectedAsset}
                    onChange={this.onChange}
                >
                {assets.map((val, index)=>{
                    return(<MenuItem key={index} value={val.value} primaryText={val.label}/>);
                })}
                </SelectField>

              </GenericProject>
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