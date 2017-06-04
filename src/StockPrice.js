
import React, { PureComponent } from 'react';

const jsonp=(url, callback)=> {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}



export default class StockPrice extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            stockvalue:""
        };
    }
    componentWillMount(){
        jsonp('http://finance.google.com/finance/info?client=ig&q='+this.props.stock+'&callback=?', (data)=>{
            data=data[0];
            this.setState({
                up:data.c.substring(0, 1)!=='-',
                price:data.l,
                change:data.c,
                symbol:data.t
            });
        }); 
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
