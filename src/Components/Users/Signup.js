import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { useCallback } from 'react';
import './Login.css'

function Signup() {
    let [firstName, setfirstname] = useState("")
    let [lastName, setlastname] = useState("")
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
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, { firstName, lastName, email, password }, config)
            if (data.statusCode === 200) {
                setToggle(false)
                sessionStorage.setItem('token', data.user.token)
                sessionStorage.setItem('userId', data.user._id)
                navigate('/quotes')
            }
            else {
                setToggle(false)
                setMessage(data.message)
                setTimeout(() => {
                    setfirstname("")
                    setlastname("")
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
            <p>Signup to Continue</p>
        </div>
        <div className='login-main-wrapper'>
            <Form>

                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name='firstName' value={firstName} placeholder="Enter First Name" onChange={(e) => setfirstname(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name='lastName' value={lastName} placeholder="Enter Last Name" onChange={(e) => setlastname(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={() => handleLogin()}>
                    Submit
                </Button>
            </Form>
            {toggle ? <Spinner animation="border" variant="primary" /> : <></>}
            {message ? <div style={{ "color": "red", "textAlign": "center" }}>{message}</div> : <></>}
            <p>If you already have an account, please <span onClick={() => {
                sessionStorage.removeItem("Signup")
                navigate('/')
            }}>Login</span></p>
        </div>
    </>
}

export default Signup