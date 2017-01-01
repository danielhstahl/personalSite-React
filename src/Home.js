import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link} from 'react-router';
import CustomCard from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';
import {GridList} from 'material-ui/GridList';
import StockPrice from './StockPrice';
class Home extends Component {
  render() {
    return (
      <CustomGridList>
        <CustomGrid>
          <CustomCard title="Vision" img={require("./assets/images/SingaporeSkyline-small.jpg")} >
              To be at the cutting edge of financial and technological progress by promoting and inventing innovations in application development, design architecture, and mathematical modeling.
          </CustomCard>
        </CustomGrid>

        <CustomGrid>
          <CustomCard title="Summary" img={require("./assets/images/backgroundsmall.jpg")} >
              I work for <a href="http:/regions.com" target="_blank">Regions</a> (<StockPrice stock='NYSE:RF'/>) in model risk.  I have a masters degree in mathematical finance from the University of North Carolina Charlotte.  Previously I have worked  at <a href='http://glsllc.com'  target="_blank">GLS</a> in portfolio analytics, as an internal auditor in quantitative analysis at BB&T (<StockPrice stock='NYSE:BBT'/>),  and as a model developer and risk analyst at Uwharrie Capital Corp (<StockPrice stock='OTCMKTS:UWHR'/>).  I currently reside in Birmingham, AL.
          </CustomCard>
        </CustomGrid>
      </CustomGridList>
    );
  }
}

export default Home;