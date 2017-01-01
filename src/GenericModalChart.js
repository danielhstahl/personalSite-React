import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
var config={
    chart: {
        type: 'line'
    },
    legend:{
      enabled:false
    },
    title: {
      text: ''
    }
};

export default class GenericModalChart extends Component{
    constructor(props){
        super(props);
        this.state={
            completed:0,
            showProgress:true,
            showDialog:false,
            //ws:this.props.ws
        };
        this.props.ws.on('progress', (msg)=>{
             this.setState({
                 completed:msg
             });
        });
        this.props.ws.on(this.props.finish, (msg)=>{
            let chart = this.refs.chart.getChart();
            chart.series[0].setData(msg);
            this.setState({
                showProgress:false
            });
        });
        config.title.text=this.props.title;
    }
    handleOpen = () => {
        this.setState({showDialog: true});
    };
    handleClose = () => {
        this.setState({showDialog: false});
    };
    /*willReceiveProps(newProps){
        
    }*/
    render(){
        return(
            
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleClose}
        >
          {this.state.showProgress?
            <LinearProgress mode="determinate" value={this.state.completed}/>:
            <ReactHighcharts config={config} ref="chart"></ReactHighcharts>}
        </Dialog> 
            
        );
    }
}