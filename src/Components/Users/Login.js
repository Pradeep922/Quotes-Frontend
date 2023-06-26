import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { useCallback } from 'react';
import './Login.css'

function Login() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [toggle, setToggle] = useState(false)
  let [message, setMessage] = useState("")
  let navigate = useNavigate()

  const logincheck = useCallback(async () => {
    try {
      let token = sessionStorage.getItem('token')
      if (token) {
        navigate('/quotes')
      } else {
        let signup = sessionStorage.getItem("Signup")

        if (signup) {
          navigate('/signup')
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [navigate])

  useEffect(() => {
    logincheck()
  }, [logincheck])

  let handleLogin = async () => {
    try {
      setToggle(true)
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      }
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email, password }, config)
      if (data.statusCode === 200) {
        setToggle(false)
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('userId', data.userId)
        navigate('/quotes')
      }
      else {
        setToggle(false)
        setMessage(data.message)
        setTimeout(() => {
          setMessage("")
          setEmail("")
          setPassword("")
        }, 3000)

      }
    } catch (error) {
      console.log("error", error)
    }




  }

  return <>
    <div className="login-wrapper">
      <h1>Welcome to App</h1>
      <p>Login to Continue</p>
    </div>
    <div className='login-main-wrapper'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={() => handleLogin()}>
          Submit
        </Button>
      </Form>
      {toggle ? <Spinner animation="border" variant="primary" /> : <></>}
      {message ? <div style={{ "color": "red", "textAlign": "center" }}>{message}</div> : <></>}
      <p>If you don't have an account, please <span onClick={() => {
        sessionStorage.setItem("Signup", true)
        navigate('/signup')
      }}>Signup</span></p>
    </div>
  </>
}

export default Login