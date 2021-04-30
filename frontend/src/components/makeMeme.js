import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { Card, CardColumns } from 'react-bootstrap'

import '../App.css'
import Meme from './Meme'
import MemeModal from './MemeModal'

const MakeMeme = ({setWhich}) => {

    const [memes , setMemes] = useState([])
    const [memesShown, setMemesShown] = useState([])
    const [search, setSearch] = useState('')
    const [editing, setEditing] = useState(false)
    const [editingPhoto, setEditingPhoto] = useState({})

    useEffect(async() => {
       const { data } = await axios.get('/api/getMemes')
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


    return (<>
        <Card>
            <Card.Title style ={{fontFamily : 'Chalkduster'}}>Filter Memes Here</Card.Title>
            <input className = "memeSearch" type = "text" value={search} onChange={e => setSearch(e.target.value)}></input>
        </Card>
        <div className = "memeSection">
            <CardColumns>
            {memesShown.map(({url, id, name, box_count}) => <Meme id={id} name={name} url ={url} modalFunc = {getMemeAndEdit} box_count = {box_count}/>)}
            </CardColumns>
        </div>
        <MemeModal editing={editing} url={editingPhoto.url} setEditing={setEditing} width={1000} id = {editingPhoto.id} box_count={editingPhoto.box_count} setWhich ={setWhich}/></>)
}

export default MakeMeme
