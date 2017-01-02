import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';

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
      text: ''
    },
    xAxis:{
        categories:[]
    },
    series:[{
        color:"",
        data:[]
    }]
    
};

export default class GenericModalChart extends Component{
    constructor(props){
        super(props);
        //config.title.text=this.props.title;
        this.state={
            completed:0,
            showProgress:true,
            showDialog:false,
            config:config
            //ws:this.props.ws
        };
        this.props.ws.on(this.props.finish, (msg)=>{
            var vals=JSON.parse(msg);
            console.log(vals);
            var shadowObj={
                showProgress:{$set:false},
                config:{
                    xAxis:{categories:{$set:this.props.handleXAxis?this.props.handleXAxis(vals):null}},
                    series:[{$set:this.props.handleSeries?this.props.handleSeries(vals):null}],
                    title: {
                        text:{$set:this.props.title}              
                    }
                }
            };
            const updateConfig=update(this.state, shadowObj);
            //let chart = this.refs.chart.getChart();
            //chart.series[0].setData(vals);
            console.log(updateConfig);
            this.setState(updateConfig);
        });
        
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    componentWillReceiveProps(newProps){
        if(newProps.runPressed){
            this.setState({
                showDialog:newProps.showDialog
            });
        }
        
    }
    render(){
        return(
            
        <Dialog
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleClose}
        >
          {this.state.showProgress?
            <CircularProgress size={80} thickness={5} />:
            <ReactHighcharts config={this.state.config} ref="chart"></ReactHighcharts>}
        </Dialog> 
            
        );
    }
}