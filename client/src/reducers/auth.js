import {
    REGISTER_SUCCESS,DELETE_ACCOUNT,REGISTER_FAIL ,USER_LODED, AUTH_ERROR,LOGIN_FAIL,LOGOUT,LOGIN_SUCCESS
} from '../actions/types';

const initialState ={
    token:localStorage.getItem('token'),
    isAuthenticated: null,
    loading : true,
    user:null
}

export default function(state= initialState, action ){
    const { type , payload} = action;

    switch(type){
        case USER_LODED: 
           return {
               ...state ,
               isAuthenticated: true,
               loading:false,
               user:payload
           }
       case LOGIN_SUCCESS:
       case REGISTER_SUCCESS:
           localStorage.setItem('token', payload.token)
           return {
               ...state,
               ...payload,
               isAuthenticated:true,
               loading:false
           }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
         default:
            return state
    }
} 