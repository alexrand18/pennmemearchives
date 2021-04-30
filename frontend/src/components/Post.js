import React, { useState , useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { ChatDots } from 'react-bootstrap-icons'
import '../App.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios'

const Post = ({url, caption, _id, author, comments}) => {

    const [isCommenting, setIsCommenting] = useState(false)
    const [comment, setComment] = useState('')
    const [updatedComments, setUpdatedComments] = useState([])

    const submitComment = async e => {
        e.preventDefault()
        const { data } = await axios.post('/api/addComment', {_id, comment})
        setUpdatedComments([...comments, {author : data , text : comment , timestamp : Date.now()}])
        setComment('')
        setIsCommenting(false)
    }

    useEffect(() => {
        const sortedComments = comments.sort((a, b) => a.timestamp - b.timestamp)
        setUpdatedComments(sortedComments)
    }, [])



    return (
            <Card className = "postCard">
                <Card.Img variant = "top" className = "memeImg" src = {url}/>
                <Card.Body>
                    <div className = "captionRow d-flex">
                        <div className = "userText">{author}:</div>
                        <div className= "caption">{caption} </div>
                        <div className = "ml-auto"><ChatDots  className = "commentIcon" size={30} onClick = {() => (setIsCommenting(!isCommenting))}/></div>
                    </div>
                    {updatedComments.map(comment => (<div><b>{`${comment.author}: `}</b>{comment.text}</div>))}
                    {isCommenting && (<div className = "makeCommentRow d-flex">
                        <div className="commentInputWrapper"><textarea className = "commentInput" value = {comment} onChange = {(e) => setComment(e.target.value)} placeholder = "Add comment..."/></div>
                        <div className = "respond ml-auto"><i className="fa fa-reply ricon" aria-hidden="true" onClick = {(e) => (submitComment(e))}></i></div>
                    </div>)}
                </Card.Body>
            </Card>
    )
}

export default Post