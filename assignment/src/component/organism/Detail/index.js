import React from 'react';
import {useSelector} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';

const Detail=(props)=>{
    let getSuccess=useSelector(state=>state.Auth.pageSuccess);
    if(!getSuccess){
        return <Redirect to="/" />

    }
    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                <h5 className="card-title">Password updated successfully</h5>

                </div>
            </div>
        </div>
     
    )
}

export default withRouter(Detail)