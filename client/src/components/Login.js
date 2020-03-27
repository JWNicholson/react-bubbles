import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

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
      <p>Login here</p>
      <div className="loginForm-container">
          <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" 
            name="username" 
            id="username" 
            placeholder="Username" 
            value={login.username}
            onChange={handleChange}
            />
        </FormGroup>

        <FormGroup>
          <Label for="assword">Password</Label>
          <Input type="password" 
          name="password" 
          id="password" 
          placeholder="password" 
          value={login.password}
          onChange={handleChange}
          />
        </FormGroup>
       <Button>Login</Button>
          </Form>
      </div>
    </>
  );
};

export default Login;
