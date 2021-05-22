import React,{useState,useEffect,Fragment} from 'react';
import Input from '../../molecules/input';
import {emailText,numberText,pwdText} from '../../../helper/method';
import {formSubmit,MsgClear} from '../../../store/Action/master';
import {useSelector, useDispatch} from 'react-redux';
import ApiAll from '../../../services/loginApi';
import {withRouter,Redirect} from 'react-router-dom';
let  api= new ApiAll();

const Landing=(props)=>{
    let dispatch=useDispatch();
    let getState=useSelector(state=>state.Auth.userInfo);
    let getSuccess=useSelector(state=>state.Auth.pageSuccess);
    const [state,setState]=useState({userName:"",pwd:"",Cpwd:""}) // form state
    const [error,setError]=useState({});
    const [emailCheck,setEmailCheck]=useState(null); // email or phone number bases on true false
    const [userCheck,setUserCheck]=useState(null); // check existing user
    const [msg,setMsg]=useState(''); // api false msg
    

    // form onChange
    const HandlerChange=(name,value)=>{
        let allState={...state}
        if(name==="userName"){
            setEmailCheck(null);
        }
        allState[name]=value
        setState(allState)
       }
       useEffect(()=>{
           console.log(getState,'getState.userInfo')
        if(getState!==""){
            setMsg(getState)
            setTimeout(function(){ 
                setMsg('')
                dispatch(MsgClear(''))
            }, 1000);
        }else{
            setMsg('')
        }
       },[getState])

       useEffect(()=>{
          
        if(emailCheck!==null ){
            let {userName}=state;
            let payload={    
                "emailid":emailCheck?userName:"",
                "mobileno": !emailCheck?userName:"",
                "type": emailCheck?"emailid":"mobileno",
            }
            api.userExist(payload).then(res=>{
                console.log(res,'resData')
                if(res.success){
                    setUserCheck(true)
                    setMsg('')
                }else{
                    setUserCheck(false)
                    setMsg(res.result)
                    setTimeout(function(){ 
                        setMsg('')
                    }, 1000);
                }
            }).catch(error=>{
                console.log(error)
            })
        }
       },[emailCheck])  
       
    const UserCheck=()=>{
        let {userName}=state;
            let payload={    
                "emailid":emailCheck?userName:"",
                "mobileno": !emailCheck?userName:"",
                "type": emailCheck?"emailid":"mobileno",
            }
            api.userExist(payload).then(res=>{
                console.log(res,'resData')
                if(res.success){
                    setUserCheck(true)
                    setMsg('')
                }else{
                    setUserCheck(false)
                    setMsg(res.result)
                    setTimeout(function(){ 
                        setMsg('')
                    }, 1000);
                }
            }).catch(error=>{
                console.log(error)
            })
    }   

    // blur function   
    const validate=(name,value)=>{
        let type =name;
        let errorMsg={...error};
        if(type==="userName"){
            let emailCheck=null;
            if(value===""){
                errorMsg['userNameError']="Please enter email id/phone number"
            }else if(numberText(value)){
                if(value.length!==10){
                    errorMsg['userNameError']="Please enter 10 digit phone number";
                    emailCheck=null;
                }else{
                    errorMsg['userNameError']="";
                    emailCheck=false;
                }

            }else{
                let EmailCheck= emailText(value);
                if(!EmailCheck){
                    errorMsg['userNameError']="Please enter email id/phone number"
                    emailCheck=null;
                }else{
                    errorMsg['userNameError']="";
                    emailCheck=true;
                }
            }
            setEmailCheck(emailCheck)
            setError(errorMsg)
        }
        if(type==="pwd"){
            if(value===""){
                errorMsg['pwdError']="Please enter password"
            }else if(!pwdText(value)){
                errorMsg['pwdError']="Entered password doesn't not match criteria "
            }else{
                errorMsg['pwdError']="";
            }
            setError(errorMsg)
           
        }   

        if(type==="Cpwd"){
            if(value===""){
                errorMsg['CpwdError']="Please enter password"
            }else if(!pwdText(value)){
                errorMsg['CpwdError']="Entered password doesnt not match criteria"
            }
            else if(value!==state.pwd){
                errorMsg['CpwdError']="Password and confirm password field should be match"   
            }
            else{
                errorMsg['CpwdError']="";
            }
            setError(errorMsg)
        }
        
        
    } 
 
 const FormValid=()=>{
     let isValid=false;
     let errorMsg={...error};
     let {userName,pwd,Cpwd}=state;
     let ECheck= emailText(userName);
    
    let pwdcheck=pwdText(pwd);
    let pwdcheck1=pwdText(Cpwd);
      if(userName===""){
        errorMsg['userNameError']="Please enter email id/phone number"
      }else if(emailCheck && !ECheck){
            errorMsg['userNameError']="Please enter email id/phone number"
        }
       
        else if(!emailCheck && userName.length!==10){
            errorMsg['userNameError']="Please enter email id/phone number"
        }else if(pwd===""){
            errorMsg['pwdError']="Please enter password"
        }else if(!pwdcheck){
            errorMsg['pwdError']="Entered password doesn't not match criteria"
        }
        else if(Cpwd===""){
            errorMsg['CpwdError']="Please enter password"
        }else if(!pwdcheck1){
            errorMsg['CpwdError']="Entered password doesn't not match criteria"
        }else if(pwd!==state.pwd){
            errorMsg['CpwdError']="Password and confirm password field should be match"   
        }else if(userName===state.Cpwd){
            errorMsg['CpwdError']="Entered password doesn't not match criteria"   
        }
        else{
            errorMsg['userNameError']="";
            errorMsg['pwdError']="";
            errorMsg['CpwdError']="";
            isValid=true;
        }
        setError(errorMsg)
        return isValid

}  
   
    
  const submitbtn=()=>{
      let checkF=FormValid();
      if(checkF){
          let payload=
            {    
                "emailid": emailCheck?state.userName:"",
                "mobileno":!emailCheck?state.userName:"",
                "type": emailCheck?"emailid":"mobileno",
                "password": state.Cpwd            
            }
          
        dispatch(formSubmit(payload))
      }
      
  }   
  if(getSuccess){
    return <Redirect to="/Detail" />
     // console.log(getStata,'getStata')
  }
console.log(msg,'MSG')
    return(
        <div className="container">  
            <form id="contact" action="" method="post">
                <h3>Login</h3>
               
                <Input
                    label="EmailID / Phone"
                    type='text'
                    name="userName"
                    value={state.userName}
                    onChange={HandlerChange}
                    validate={validate}
                    error={error['userNameError']}
                />
              {userCheck?
              <Fragment> 
                 <Input
                    label="Password"
                    type='password'
                    name="pwd"
                    value={state.pwd}
                    onChange={HandlerChange}
                    validate={validate}
                    error={error['pwdError']}
                />
                 <Input
                    label="Confirm Password"
                    type='password'
                    name="Cpwd"
                    value={state.Cpwd}
                    onChange={HandlerChange}
                    validate={validate}
                    error={error['CpwdError']}
                />
               
               
               
               <p>   Note:
                    • Min:1 lowercase and 1 uppercase alphabet
                    •	Min: 1 number
                    •	Min: 1 special character
                    •	8-16 character length
                    •	Shouldn’t be the same as username
                    •	Shouldn’t be the same as last password
                    </p>
                </Fragment> :null}
                {msg!==""?<div class="alert alert-warning">{msg}</div>:null}
                
                <fieldset>
                 {getState.fStatus?"Please Wait":null}   
                <button name="submit" type="button" onClick={submitbtn} id="contact-submit" data-submit="...Sending">Submit</button>
                </fieldset>
            </form>
            </div>
    )
}
export default withRouter(Landing)