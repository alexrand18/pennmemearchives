import React, { useState , useEffect } from 'react'
import axios from 'axios'

import '../App.css'
import Post from './Post'


const Feed = () => {

    const [posts, setPosts] = useState([])

    useEffect(async () => {
        const { data } = await axios.get('/api/getMyFriendsMemes')
        console.log(data)
        setPosts(data)
    }, [])

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