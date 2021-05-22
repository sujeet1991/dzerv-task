const validationService = require('../services/validationService');
const loginModel = require('../models/loginModel');

exports.checkUserExist = async (req, res) => {
	try {
    	let incomingReq = req.body;
    	console.log("updatePassword", incomingReq);
    	let validateReq         = await validationService.validateForm2(incomingReq);        
        if(!validateReq.success){            
            res.json(validateReq);
            return false;
        }
        let emailid = incomingReq.emailid;      
    	let mobileno = incomingReq.mobileno;      
    	let type = incomingReq.type; 
    	let password = incomingReq.password; 

    	var userExist = {};
    	if(emailid!==""){
    		userExist["emailid"] = emailid;    	
    	}else{
    		userExist["mobileno"] = mobileno;    		
    	}
    	let userExistResp = await loginModel.checkUserExist(userExist);
    	console.info("userExist.response", Object.keys(userExistResp.response).length)
		if(!userExistResp.success){
    		res.json({"success": false, "result": "Some error occurred."});	
    	}else{
			if(Object.keys(userExistResp.response).length > 0){    		
				res.json({"success": true, "result": "User exists"});
			}else{
				res.json({"success": false, "result": "User details not available."});	
			}
		}	
    } catch (error) {
        console.log("error", error);
        res.json({"success": false, "result": error});
    }   	
}

exports.updatePassword = async (req, res) => {
    try {
    	let incomingReq = req.body;
    	console.log("updatePassword", incomingReq);
    	let validateReq = await validationService.validateForm1(incomingReq);        
        if(!validateReq.success){            
            res.json(validateReq);
            return false;
        }
    	let emailid = incomingReq.emailid;      
    	let mobileno = incomingReq.mobileno;      
    	let type = incomingReq.type; 
    	let password = incomingReq.password; 

    	var userExist = {};
    	if(emailid!==""){
    		userExist["emailid"] = emailid;    	
    	}else{
    		userExist["mobileno"] = mobileno;    		
    	}
    	console.log("userExist", userExist);
    	let userExistResp = await loginModel.checkUserExist(userExist);    
    	console.info("userExist.response", Object.keys(userExistResp.response).length)
    	// let userExistResp = await profileModel.userExist(userExist);  
		if(!userExistResp.success){
    		res.json({"success": false, "result": "Some error occurred."});	
    	}else{  	    	
			if(Object.keys(userExistResp.response).length > 0){
				let checkPassword = await loginModel.checkPassword({password: password, ...userExist});    	console.log("checkPassword--->", checkPassword);
				if(Object.keys(checkPassword.response).length > 0){    			
					res.json({"success": false, "result": "Password cannot be same as previous password."});    			
				}else{
					let updateResp = await loginModel.updatePassword({password: password}, userExist)	
					res.json({"success": true, "result": "Password updated successfully."});
				}    		    		
			}else{
				res.json({"success": false, "result": "User details not available."});	
			}
		}		
    	
        
    } catch (error) {
        console.log("error", error);
        res.json({"success": false, "result": error});
    }
}