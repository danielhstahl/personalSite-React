import {GridList, GridTile} from 'material-ui/GridList';
import React from 'react';
const gridStyle={
    marginTop:'75px',
    marginLeft:'20px',
    marginRight:'50px',
};

export const CustomGridList=({children})=>
    <GridList cols={1} cellHeight='auto'>
        {children}
    </GridList>

export const CustomGrid =({children})=>
    <GridTile style={gridStyle}>
        {children}
    </GridTile>