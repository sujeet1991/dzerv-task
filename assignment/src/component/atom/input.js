import React from 'react';

const Input=(props)=>{
    return(
        <input
         type={props.type}
         name={props.name}
         value={props.value}
         onChange={props.onChange}
         onBlur={props.onBlur}


        />
    )
}

export default Input