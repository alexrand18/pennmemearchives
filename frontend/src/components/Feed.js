import React, { useState , useEffect } from 'react'
import axios from 'axios'

import '../App.css'
import Post from './Post'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')


const Feed = () => {

    const [posts, setPosts] = useState([])
    const [socketInfo, setSocketInfo] = useState('')

    useEffect(async () => {
        const { data } = await axios.get('/api/getMyFriendsMemes')
        setPosts(data)
        socket.on('getNewMeme', meme => {
            setSocketInfo(meme)
        })
    }, [])

    useEffect(async () => {
        const isFriend = await axios.post('/api/isFriend' , {user : socketInfo.author})
        if (isFriend.data === true) {
            setPosts([socketInfo , ...posts])
        }
    }, [socketInfo])


    return (<><div className = "container-fluid">
        <div className = "row">
            <div className = "col-2"></div>
            <div className = "col-8">
            {posts.map(({image, caption, _id, author, comments}) => <Post url ={image} caption = {caption} _id = {_id} author = {author} comments = {comments}/>)}
            </div>
            <div className = "col-2"></div>
        </div>
        </div></>)
}

export default Feed