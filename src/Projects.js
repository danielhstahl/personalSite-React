import React, { Component } from 'react';
//import io from 'socket.io-client';
import {CustomGrid, CustomGridList} from './CustomGrid';
import CreditProject from './CreditProject';
import OpsProject from './OpsProject';
import MarketProject from './MarketProject';
//import GenericModalChart from './GenericModalChart';

const httpurl="https://7229z53ukd.execute-api.us-east-1.amazonaws.com/prd";
const filterSubmission=(submission)=>{
  var obj={};
  for(var key in submission){
    obj[key]=submission[key].value;
  }
  return obj;
}
const Projects=(props)=>{//extends Component {
  /*onstructor(props){
    super(props);
  }*/
  /*componentWillUnmount(){
    this.socket.close();
  }*/
  //render() {
    return (
      <CustomGridList>
        <CustomGrid>
            <CreditProject url={httpurl} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <OpsProject url={httpurl} filterSubmission={filterSubmission}/>
        </CustomGrid>
        <CustomGrid>
            <MarketProject url={httpurl} filterSubmission={filterSubmission}/>
        </CustomGrid>
       </CustomGridList> 
    );
  //}
}

export default Projects;