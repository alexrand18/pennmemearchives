import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import '../App.css'
import NavBar from './NavBar'
import YourMemes from './yourMemes'
import MakeMeme from './makeMeme'
import Feed from './Feed'

const Home = () => {
    const [which , setWhich] = useState({})
    const [username, setUsername] = useState('')

    const history = useHistory()

    useEffect(async () => {
        const {data} = await axios.get('/api/loggedInUser')
        if (data === 'not logged in') {
            history.push('/login')
        } else {
            setUsername(data)
            setWhich({'home' : true, 'makeMeme' : false, 'yourMemes' : false})
        }
    }, [])

    return (<><NavBar setWhich = {setWhich} which = {which} username = {username}/>
    {(which['home'] === true) && (<Feed/>)}
    {(which['makeMeme'] === true) && (<MakeMeme setWhich = {setWhich}/>)}
    {(which['yourMemes'] === true) && (<YourMemes/>)}</>)
}

export default Home