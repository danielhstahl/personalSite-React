import React from 'react';
import TextField from 'material-ui/TextField';


export const TextFieldGeneric =(
    {errorMsg, label, value, callback})=>
    <TextField value={value}
        onChange={(event, value)=>{return callback(value);}}
        floatingLabelText={label}
        errorText={errorMsg}
    />

