import React, { Component } from 'react';
import io from 'socket.io-client';
import {CustomGrid, CustomGridList} from './CustomGrid';
import CreditProject from './CreditProject';
import OpsProject from './OpsProject';
import MarketProject from './MarketProject';
//import GenericModalChart from './GenericModalChart';

const socket = io.connect('http://45.55.153.219:80/');
socket.on('connect', ()=>{
  console.log("Connected");
  socket.emit('creditrisk', {hello:"world"});//dummy data
  socket.emit('marketrisk', {hello:"world"});//dummy data
  socket.emit('getYield', {hello:"world"});//dummy data
  socket.emit('opsrisk', {hello:"world"});//dummy data
});
const filterSubmission=(submission)=>{
  var obj={};
  for(var key in submission){
    obj[key]=submission[key].value;
  }
  return obj;
}
class Projects extends Component {
  componentWillUnmount(){
    socket.close();
  }
  render() {
    return (
      <CustomGridList>
        <CustomGrid>
            <CreditProject ws={socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <OpsProject ws={socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <MarketProject ws={socket} filterSubmission={filterSubmission}/>
        </CustomGrid>
       </CustomGridList> 
    );
  }
}

export default Projects;