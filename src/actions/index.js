import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_PATIENTS,
  SEARCH,
  PATIENT_DETAILS
} from './types';

//const ROOT_URL = 'http://localhost:3090';
const ROOT_URL='http://35.190.166.59:9000'
export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/patient');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/patients`, {
      headers: { 'X-Auth-Token': localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
export function fetchPatients() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/patients`, {
      headers: { 'X-Auth-Token': localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_PATIENTS,
          payload: response.data
        });
      });
  }
}


export function search(value) {
  return {type: SEARCH, value};
}

export function patientDetails(data){
   return function(dispatch){
      dispatch({
        type:PATIENT_DETAILS,
        payload:data
    });
    }
}