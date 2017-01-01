import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {CustomCard} from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';
import CreditProject from './CreditProject';
//$color-primary: $palette-grey-500;
//mdl-color--grey-800

class Projects extends Component {
  render() {
    return (
      <CustomGridList>
        <CustomGrid>
            <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
               This project shows how to compute the distribution of a credit portfolio of defaultable assets with stochastic PD and LGD.  It includes full granularity and efficient computation.
               <CreditProject/>
            </CustomCard>
        </CustomGrid>
       </CustomGridList> 
    );
  }
}

export default Projects;