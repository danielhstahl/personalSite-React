import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import {grey500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import {realValidation, checkValidation, isPositiveInteger, isPositiveNumber, onTypeTextField} from './UsefulProjectLambda.js';
const startingAsset=0;

const standardFields={
    n:{
        label:"# of simulations",
        value:1000,
        validationFunction:function(val){
            return isPositiveInteger(val)&&val<100000&&val>50?"":"Between 50 and 100000";
        }
    },
    r0:{
        label:"Current Short Rate",
        value:0.04,
        validationFunction:function(val){
            return isPositiveNumber(val)&&val<.5&&val>.001?"":"Between .001 and .1";
        }
    },
    sigma:{
        label:"Volatility",
        value:0.04,
        validationFunction:function(val){
            return isPositiveNumber(val)&&val<.5&&val>.01?"":"Between .01 and .1";
        }
    },
    a:{
        label:"Mean Reversion",
        value:0.2,
        validationFunction:function(val){
            return isPositiveNumber(val)&&val<.5&&val>.01?"":"Between .01 and .5";
        }
    },
    b:{
        label:"Long Run Average",
        value:0.05,
        validationFunction:function(val){
            return isPositiveNumber(val)&&val<.5&&val>.01?"":"Between .01 and .5";
        }
    },

    t:{
        label:"Simulate to (in days)",
        value:10,
        validationFunction:function(val){
            return isPositiveInteger(val)&&val<30?"":"Positive Integer<30"
        }
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
            validationFunction:function(val, val1){
                return val*360>val1?"":"Required > \"Simulate to date\"";
            }
        }
    }, standardFields)
},{
    label:"Euro Dollar Future",
    value:1,
    params:Object.assign({
        T:{
            label:"Maturity (years)",
            value:1,
            depends:"t",
            validationFunction:function(val, val1){
                return val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return  val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        Tm:{
            label:"Underlying Maturity",
            value:1.25,
            depends:"T",
            validationFunction:function(val, val1){
                return val>val1?"":"Required > Maturity";
            }
        },
        k:{
            label:"Strike",
            value:.97,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        Tm:{
            label:"Underlying Maturity",
            value:1.25,
            depends:"T",
            validationFunction:function(val, val1){
                return val>val1?"":"Required > Maturity";
            }
        },
        k:{
            label:"Strike",
            value:.97,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            validationFunction:realValidation
        },
        k:{
            label:"Strike",
            value:.02,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return  val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            validationFunction:realValidation
        },
        k:{
            label:"Swap Rate",
            value:.02,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return  val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            validationFunction:realValidation
        },
        Tm:{
            label:"Underlying Maturity",
            value:6,
            depends:"T",
            validationFunction:function(val, val1){
                return val>val1?"":"Required > Maturity";
            }
        },
        k:{
            label:"Strike",
            value:.03,
            validationFunction:realValidation
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
            validationFunction:function(val, val1){
                return val*360>val1?"":"Required > \"Simulate to date\"";
            }
        },
        delta:{
            label:"Floating Tenor",
            value:.25,
            validationFunction:realValidation,
        },
        Tm:{
            label:"Underlying Maturity",
            value:6,
            depends:"T",
            validationFunction:function(val, val1){
                return val>val1?"":"Required > Maturity";
            }
        },
        k:{
            label:"Strike",
            value:.03,
            validationFunction:realValidation
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
const preDefinedDropDown=assets.map((val, index)=>{
    return(<MenuItem key={index} value={val.value} primaryText={val.label}/>);
})
export default class MarketProject extends Component{
    state={
        showProgress:true,
        showDialog:false,
        config:config,
        selectedAsset:startingAsset,
        fields:getSubFields(startingAsset, assets).params
    };
    shouldComponentUpdate(nextProps, nextState){
        return nextState!==this.state
    }
    onMarketSubmit=()=>{
        const myObj=Object.assign(this.props.filterSubmission(this.state.fields), {asset:this.state.selectedAsset})
        axios.get(`${this.props.url}/marketRisk`, {params:myObj})
        .then((response)=>{
            const vals=response.data;
            this.setState((prevState, props)=>{
                return {
                    showProgress:false,
                    config:Object.assign({}, prevState.config, {
                        xAxis:{
                            categories:vals.bins
                        },
                        series:[{color:grey500,  data:vals.count}]
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
    onChange=(event, index, value)=>{
        this.setState((prevState, props)=>{
            return {
                selectedAsset:value,
                fields:getSubFields(value, assets).params
            }
        });
    }
    onTypeTextField=(value, name)=>{
        console.log(value)
        this.setState(onTypeTextField(value, name));
    };
    render(){
        const {fields, selectedAsset, showDialog, showProgress, config}=this.state
        return(
            <CustomCard title="Market Risk" img={require("./assets/images/marketRisk.jpg")} >
               This project shows a Monte Carlo simulation (featuring C++ backend) for the distribution of a variety of assets.
              <GenericProject fields={fields} onRun={this.onMarketSubmit} parseValidation={checkValidation} documentation={require("./assets/pdf/MarketRiskDocumentation.pdf")} callback={this.onTypeTextField}>
                <SelectField
                    floatingLabelText="Select an Asset"
                    value={selectedAsset}
                    onChange={this.onChange}
                >
                {preDefinedDropDown}
                </SelectField>

              </GenericProject>
              <Dialog
                modal={false}
                open={showDialog}
                onRequestClose={this.handleClose}
                >
                {showProgress?
                    <CircularProgress size={80} thickness={5} />:
                    <ReactHighcharts config={config}></ReactHighcharts>}
                </Dialog>
            </CustomCard>
        );
    }
}

