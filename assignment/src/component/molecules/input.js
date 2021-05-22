import React from 'react';
import Input from '../atom/input';
import Label from '../atom/label';
import Error from '../atom/Error';

const InputData=(props)=>{
    const changeHandler=(e)=>{
        let {name,value}=e.target;
        props.onChange(name,value)
    }
    const BlurCheck=(e)=>{
        let {name,value}=e.target;
        props.validate(name,value)
    }
    return (
        <fieldset>
            <Label label={props.label}/>
            <Input
             type={props.type}
             name={props.name}
             value={props.value}
             onChange={changeHandler}
             onBlur={BlurCheck}
             
            />
            <Error error={props.error}/>


        </fieldset>
    )
}

export default InputData