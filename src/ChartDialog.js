import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import ReactHighcharts from 'react-highcharts';
import CircularProgress from 'material-ui/CircularProgress';
export default class ChartDialog extends Component{
    shouldComponentRender(nextProps, nextState){
        return this.props.showDialog!==nextProps.showDialog||this.props.config!==nextProps.config
    }
    render(){
        const {showDialog, config, handleClose}=this.props
        const chart=config&&<ReactHighcharts config={config}></ReactHighcharts>
        const progress=<CircularProgress size={80} thickness={5} />
        return <Dialog
            modal={false}
            open={showDialog}
            onRequestClose={handleClose}
        >
            {config?chart:progress}
        </Dialog>
    }
}