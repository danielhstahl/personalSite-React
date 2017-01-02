
import React, { Component } from 'react';

const Ajax = require('simple-ajax');
    
export default class StockPrice extends Component{
    constructor(props){
        super(props);
        this.state={
            stockvalue:""
        };
    }
    componentWillMount(){
        var ajax = new Ajax({
            url:'http://finance.google.com/finance/info?client=ig&q='+this.props.stock+'&callback=?',
            dataType:'jsonp',
            method:'get',
            contentType:false,
            requestedWith:false
        });
        ajax.on('success', (event)=>{
            var data=event.target.response;
            data=JSON.parse(data.substring(3));
            data=data[0];
            this.setState({
                up:data.c.substring(0, 1)!=='-',
                price:data.l,
                change:data.c,
                symbol:data.t
            });
        });
        
        ajax.send();
    }
 

    render(){
        return(
        <span>
            <span>{this.state.symbol} </span>
            <span>{this.state.price}</span>
            {this.state.up?<span style={{color:'green'}}> {this.state.change}</span>:
            <span style={{color:'red'}}> {this.state.change}</span>}       
        </span>
        );
    }
}
