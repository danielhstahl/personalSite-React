import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class CustomCard extends Component{
render() {
    return (
         <Card style={{maxWidth:'500px'}}>
            <CardMedia
            overlay={<CardTitle title={this.props.title}/>}
            
            >
            <img style={{objectFit: 'cover'}} src={this.props.img} />
            </CardMedia>
            <CardText>
            {this.props.children}
            </CardText>
        </Card>   
    );
  }
}