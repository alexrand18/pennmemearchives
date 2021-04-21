import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Modal, CardColumns } from 'react-bootstrap'
import s from 'styled-components'
import '../App.css'
import NavBar from './NavBar'
import Meme from './Meme'
import MemeModal from './MemeModal'

const MakeMeme = () => {

    const [memes , setMemes] = useState([])
    const [memesShown, setMemesShown] = useState([])
    const [search, setSearch] = useState('')
    const [editing, setEditing] = useState(false)
    const [editingPhoto, setEditingPhoto] = useState({})

    useEffect(async() => {
       const {data} = await axios.get('/api/getMemes')
       setMemes(data)
       setMemesShown(data)
    }, [])

    useEffect(()=> {
        const matches = []
        memes.forEach((meme) => {
            if (meme.name.toLowerCase().includes(search.toLowerCase())) {
                matches.push(meme)
            }
        })
        setMemesShown(matches)
    }, [search])

    const getMemeAndEdit = (meme) => {
        setEditing(true)
        setEditingPhoto(meme)
    }




    return (<><div>
        <NavBar /></div>
        <div className = "inputWrapper">
            <input className = "memeSearch" type = "text" value={search} onChange={e => setSearch(e.target.value)}></input>
        </div>
        <div className = "memeSection">
            <CardColumns>
            {memesShown.map(({url, id, name, box_count}) => <Meme id={id} name={name} url ={url} modalFunc = {getMemeAndEdit} box_count = {box_count}/>)}
            </CardColumns>
        
        </div>
        <MemeModal editing={editing} url={editingPhoto.url} setEditing={setEditing} width={1000} id = {editingPhoto.id} box_count={editingPhoto.box_count}/></>)
}

export default MakeMeme
