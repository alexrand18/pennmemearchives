import React, { useState , useEffect } from 'react'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav , Form} from 'react-bootstrap'
import { Check , Plus } from 'react-bootstrap-icons'
import s from 'styled-components'

const NavBar = ({which, setWhich , username}) => {

    const [search, setSearch] = useState('')
    const [searchResults, setResults] = useState([])
    const history = useHistory()

    const setCorrectBody = (key) => {
        const newWhich = {}
        newWhich[key] = true
        Object.keys(which).forEach((k) => {
            if (k !== key) newWhich[k] = false
        })
        setWhich(newWhich)
    }

    useEffect(async () => {
        if (search.length === 0) setResults([])
        else {
            console.log(search)
            const { data } = await axios.post('/api/getUsersWithPref', {search})
            console.log(data)
            setResults(data)
        }
    }, [search])

    const follow = async (e, username) => {
        e.preventDefault()
        const { data } = await axios.post('/api/followUser' , {username : username})
    $(`#followButton${username}`).html(`Friend <i class="fa fa-check" aria-hidden="true"></i>`)
        $(`#followButton${username}`).css('background-color', 'lightblue')
    }

    const logout = async e => {
        e.preventDefault()
        const data  = await axios.post('/account/logout')
        if (data != null) history.push('/login')
    }


   return <Navbar className = "topNavBar">
        <Navbar.Brand href="#home">
            <img src= "https://tse2.mm.bing.net/th?id=OIP.mwN4UShcmng7WJY5LjlzIQHaGN&pid=Api&P=0&w=195&h=165"
                width="60"
                height="60"
                className="d-inline-block align-top"
            ></img>
        </Navbar.Brand>
        <div>Hello, {username}</div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link onClick = {() => setCorrectBody('home')}>Feed</Nav.Link>
            <Nav.Link onClick = {() => setCorrectBody('makeMeme')}>Make Meme</Nav.Link>
            <Nav.Link onClick = {() => setCorrectBody('yourMemes')}>Your Memes</Nav.Link>
        </Nav>
        <Form inline className = "searchForm">
        <div className = "dropdown">
            <input className = "searchBar" type="text" value = {search} onChange = {(e) => setSearch(e.target.value)}placeholder="Search for users" />
            <div className = "dropdown-content">
            {searchResults.map((res) => {
                return (<div className="dropdownDiv d-flex"><div>{res.username}</div>
                <div className = "ml-auto">{res.friended === 1 && (<button className = "friendButton">Friend <i className="fa fa-check" aria-hidden="true"></i></button>)}
                    {res.friended === 0 && (<button className = "followButton" id={`followButton${res.username}`} onClick = {(e) => follow(e , res.username)}>Follow <Plus /></button>)}</div></div>
            )})}
            </div>
            </div>
        </Form>
        </Navbar.Collapse>
        <Nav>
        </Nav>
        <button className = "logOutButton" onClick = {(e) => (logout(e))}>Log out</button>
    </Navbar>
}

export default NavBar