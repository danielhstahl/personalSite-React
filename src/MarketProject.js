import React, { Component } from 'react';
import {GenericProject} from './GenericProject';
import {TextFieldPositiveReals, TextFieldBoundedInteger,  TextFieldGeneric, TextFieldPositiveIntegers, TextFieldBoundedReal} from './CustomTextFields';
import {CustomCard} from './CustomCard';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';
import {grey500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

const startingAsset=0;

const checkValidation=(val, item, obj)=>{
    //const item=obj1[name];
    if(item.validationFunction){
        const otherKey=item.depends||"";
        const val2=otherKey?obj[otherKey].value:0;
        return item.validationFunction(val, val2);
    }
    return "";
}
const isPositiveInteger=(number)=>{
    return number.toString().match(/^[1-9]\d*$/);
}
const isPositiveNumber=(number)=>{
    return number.toString().match(/^[+]?([.]\d+|\d+([.]\d+)?)$/);
}
const integerValidation=(number)=>{
    return isPositiveInteger(number)?"":"Requires a positive integer";
}
const realValidation=(number)=>{
    return isPositiveNumber(number)?"":"Requires a positive number";
}
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
const checkIfAllGood=(fields)=>{
    return Object.keys(fields).every((val, index)=>{
        const item=fields[val];
        return item.validationFunction(item.value)==="";
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
        /*this.props.ws.on('marketRisk-data', (msg)=>{
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
        });*/
    }
    onMarketSubmit=()=>{
        var myObj=this.props.filterSubmission(this.state.fields);
        myObj.asset=this.state.selectedAsset;
       // this.props.ws.emit('getMarket', myObj);
        axios.post('/RunModel/marketRisk', myObj)
        .then((response)=>{
            //console.log(response);
            var vals=JSON.parse(response.data);
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
        const shadowObj={
            selectedAsset:{$set:value},
            fields:{
                $set:getSubFields(value, assets).params
            }
        };
        const updateConfig=update(this.state, shadowObj);
        this.setState(updateConfig);
    }
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
            <CustomCard title="Market Risk" img={require("./assets/images/marketRisk.jpg")} >
               This project shows a Monte Carlo simulation (featuring C++ backend) for the distribution of a variety of assets.
              <GenericProject fields={this.state.fields} onRun={this.onMarketSubmit} parseValidation={checkValidation} documentation={require("./assets/pdf/MarketRiskDocumentation.pdf")} callback={this.onTypeTextField}>
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