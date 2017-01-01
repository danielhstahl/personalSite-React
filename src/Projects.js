import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
/*import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';*/
import io from 'socket.io-client';
import {CustomCard} from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';
import CreditProject from './CreditProject';
import OpsProject from './OpsProject';
import GenericModalChart from './GenericModalChart';
//$color-primary: $palette-grey-500;
//mdl-color--grey-800
//const ws=new WebSocket("ws://www.example.com/socketserver", "protocolOne");
const socket = io.connect('http://45.55.153.219:80/');
class Projects extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }
  componentWillUnmount(){
    socket.close();
  }
  onSubmit=(submission, socketKey)=>{
    console.log(submission);
    socket.emit(socketKey, submission);
  }
  render() {
    return (
      <CustomGridList>
        <CustomGrid>
            <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
               This project shows how to compute the distribution of a credit portfolio of defaultable assets with stochastic PD and LGD.  It includes full granularity and efficient computation.
              <CreditProject onSubmit={this.onSubmit}/>
              <GenericModalChart ws={socket} finish='creditRisk-data'/>

            </CustomCard>
        </CustomGrid>
        <CustomGrid>
            <CustomCard title="Operational Risk" img={require("./assets/images/operationalRisk.jpg")} >
               This project significantly extends the standard LDA operational loss framework to include correlation between severity and frequency and auto-correlation in frequency. The distribution can be recovered practically instantly even for very long tailed severity distributions.
               <OpsProject onSubmit={this.onSubmit}/>
            </CustomCard>
        </CustomGrid>
       </CustomGridList> 
    );
  }
}

export default Projects;