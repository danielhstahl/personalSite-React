import React, { Component } from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export class CustomCard extends Component{
render() {
    return (
         <Card style={{maxWidth:'500px'}}>
            <CardMedia
            overlay={<CardTitle title={this.props.title}/>}
            
            >
            <img role="presentation" style={{objectFit: 'cover'}} src={this.props.img} />
            </CardMedia>
            <CardText>
            {this.props.children}
            </CardText>
        </Card>   
    );
  }
}
export class TextCard extends Component{
render() {
    return (
         <Card style={{maxWidth:'500px'}}>
            <CardTitle
                title={this.props.title}
            />
            <CardText>
            {this.props.children}
            </CardText>
        </Card>   
    );
  }
}