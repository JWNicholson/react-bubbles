import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utilities/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

const [login, setLogin] = useState({
  username: '',
  password: ''
});

const history = useHistory();

const handleChange = e => {
  e.preventDefault();
  setLogin({...login, [e.target.name]: e.target.value});
}

const handleSubmit = e => {
  e.preventDefault();
  axiosWithAuth()
    .post('/login', login)
      .then(res => {
        console.log("login handlesubmit res",res);
        window.localStorage.setItem('token', res.data.payload);
        history.push('/bubbles');
      })
        .catch(err => console.log("login handlesubmit error: ", err.response));
    
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
