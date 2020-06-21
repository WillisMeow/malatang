import * as actionTypes from './actionType';
import axios from 'axios';


export const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.LOGOUT,
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const checkExpirationDate = (expirationTime) => { // Firebase has basic logout period of 3600 seconds. Counting 3600 seconds, then logging user out.
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());}, 
            expirationTime * 1000)
    };
}
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhu17APzyZk9lY_Fwto0gxxEIQUgUbj3Y"
        if (isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhu17APzyZk9lY_Fwto0gxxEIQUgUbj3Y"
        }
        console.log(url)
        axios.post(url, authData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("token", response.data.idToken)
            localStorage.setItem("userId", response.data.localId)
            localStorage.setItem("expirationDate", expirationDate)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkExpirationDate(response.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkExpirationDate((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }
}
