import axios from 'axios';
export const onTypeTextField=(value, name)=>{
    return (prevState, props)=>{
        const field=Object.assign({}, prevState.fields[name], {value})
        return {fields:Object.assign({}, prevState.fields, {[name]:field})};
    };
};

export const integerValidation=(number)=>{
    return number.toString().match(/^[1-9]\d*$/)?"":"Requires a positive integer";
}
export const realValidation=(number)=>{
    return number.toString().match(/^[+]?([.]\d+|\d+([.]\d+)?)$/)?"":"Requires a positive number";
}
export const checkValidation=(val, item, obj)=>{
    if(item.validationFunction){
        const otherKey=item.depends||"";
        const val2=otherKey?obj[otherKey].value:0;
        return item.validationFunction(val, val2);
    }
    return "";
}
export const isPositiveInteger=(number)=>{
    return number.toString().match(/^[1-9]\d*$/);
}
export const isPositiveNumber=(number)=>{
    return number.toString().match(/^[+]?([.]\d+|\d+([.]\d+)?)$/);
}

export const getLambda=(url, lambda, params, cb)=>{
    axios.get(`${url}/${lambda}`, {params})
    .then(response=>{
        const vals=response.data;
        cb(vals)
        /*this.setState((prevState, props)=>{
            return {
                showProgress:false,
                config:configFn(vals)
            };
        });*/
    })
    .catch(error=>{
        console.log(error);
    });
}