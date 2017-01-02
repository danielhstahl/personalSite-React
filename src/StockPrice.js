
import React, { Component } from 'react';

//const Ajax = require('simple-ajax');

const ajax=(url)=>{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'url');
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('User\'s name is ' + xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}



export default class StockPrice extends Component{
    constructor(props){
        super(props);
        this.state={
            stockvalue:""
        };
        //console.log(location.hostname);
    }
    componentWillMount(){
        //console.log();
        const url="http://finance.yahoo.com/webservice/v1/symbols/"+this.props.stock+"/quote?format=json";
        var ajax = new Ajax({
            url:url,//'http://finance.google.com/finance/info?client=ig&q='+this.props.stock+'&callback=?',
            dataType:'jsonp',
            method:'get',
            cors:true,
            //crossDomain: true,
            contentType:false,
            requestedWith:false,
            //headers:{/*"Access-Control-Allow-Credentials":true, "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Headers":"*", */"Content-Type":"application/x-www-form-urlencoded"}
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
