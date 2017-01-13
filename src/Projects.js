import React, { Component } from 'react';
import io from 'socket.io-client';
import {CustomGrid, CustomGridList} from './CustomGrid';
import CreditProject from './CreditProject';
import OpsProject from './OpsProject';
import MarketProject from './MarketProject';
//import GenericModalChart from './GenericModalChart';


const filterSubmission=(submission)=>{
  var obj={};
  for(var key in submission){
    obj[key]=submission[key].value;
  }
  return obj;
}
class Projects extends Component {
  constructor(props){
    super(props);
    /*this.socket = io.connect('http://45.55.153.219:80/');
    this.socket.on('connect', ()=>{
      console.log("Connected");
      this.socket.emit('creditrisk', {hello:"world"});//dummy data
      this.socket.emit('marketrisk', {hello:"world"});//dummy data
      this.socket.emit('getYield', {hello:"world"});//dummy data
      this.socket.emit('opsrisk', {hello:"world"});//dummy data
    });*/
  }
  componentWillUnmount(){
    this.socket.close();
  }
  render() {
    return (
      <CustomGridList>
        <CustomGrid>
            <CreditProject ws={this.socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <OpsProject ws={this.socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <MarketProject ws={this.socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
       </CustomGridList> 
    );
  }
}

export default Projects;