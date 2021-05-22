import { GET_PENDING,CLEAR} from './type';

export function formSubmit(data) {
    
    return {
        type: GET_PENDING,
        payload:data
    }
}

export function MsgClear(data) {
    
    return {
        type: CLEAR,
        payload:data
    }
}
