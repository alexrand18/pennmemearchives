import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav , Form} from 'react-bootstrap'
import s from 'styled-components'

const NavBar = () => {

   return <Navbar className = "topNavBar">
        <Navbar.Brand href="#home">
            <img src= "https://tse2.mm.bing.net/th?id=OIP.mwN4UShcmng7WJY5LjlzIQHaGN&pid=Api&P=0&w=195&h=165"
                width="60"
                height="60"
                className="d-inline-block align-top"
            ></img> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="/home">Feed</Nav.Link>
            <Nav.Link href="/makeMemes">Make Meme</Nav.Link>
            <Nav.Link href="/yourMemes">Your Memes</Nav.Link>
        </Nav>
        <Form inline className = "searchForm">
            <input className = "searchBar" type="text" placeholder="Search for users" />
        </Form>
        </Navbar.Collapse>
    </Navbar>
}

export default NavBar