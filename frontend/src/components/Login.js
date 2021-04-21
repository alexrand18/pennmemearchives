import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import s from 'styled-components'
import '../App.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(async () => {
        const urls = []
        const { data } = await axios.get('/api/getMemes')
        data.forEach(({url}) => urls.push(url))
        let i = Math.ceil(urls.length * Math.random())
        $('.box').css("height", '100%')
        $('.box').css("width", '100%')
        $('.box').css("background-image", `url(${urls[i]}`)
        setInterval(function () {
            i = Math.ceil(urls.length * Math.random())
            $('.box').css("background-image", `url(${urls[i]}`)
        }, 5000);
    }, [])


    const loginUser = async e => {
        e.preventDefault()
        const { data } = await axios.post('/account/login', { username, password })
        if (data === 'success') {
            history.push('/makeMeme')
        }
        else {
          // eslint-disable-next-line no-alert
          alert('There was an error logging in')
          setUsername('')
          setPassword('')
        }
      }

    return (
        <div className = "box background">
            <div className = "card loginCard">
                <div className = "card-body">
                    <div className = "card-title titleText">
                        <div className = "title">Welcome to the Penn Meme Archives!</div>
                    </div>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    <Button className="signupButton" onClick={e => loginUser(e)}>Login</Button>
                </Form>
                <div className = "footer">Don't have an account? Sign up <Link to="/signup">here!</Link></div>
                </div>
            </div> 
        </div>
    )
}

export default Login