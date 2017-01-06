import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export const CustomCard=({title, img, children}) =>

<Card style={{maxWidth:'500px'}}>
    <CardMedia
    overlay={<CardTitle title={title}/>}
    
    >
    <img role="presentation" style={{objectFit: 'cover'}} src={img} />
    </CardMedia>
    <CardText>
    {children}
    </CardText>
</Card>   

export const TextCard=({title, img, children})=>
<Card style={{maxWidth:'500px'}}>
    <CardTitle
        title={title}
    />
    <CardText>
    {children}
    </CardText>
</Card>   
