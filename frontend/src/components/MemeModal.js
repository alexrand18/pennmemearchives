import React, { useState , useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import '../App.css'
import axios from 'axios'
import { CompactPicker } from 'react-color'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')


const MemeModal = ({editing, setEditing, id , url, box_count, height, width, setWhich}) => {
    
    const [boxes, setBoxes] = useState([])
    const [background, setBackground] = useState('#ecf1f5')
    const [caption, setCaption] = useState('')

    const history = useHistory()

    useEffect(() => {
        let b = []
        for (let i = 0; i < box_count; i++) {
            b.push({text : '', color : ''})
        }
        setBoxes(b)
    }, [editing])


    const imgStyle = {
        width: "100%",
        height: "100%"
    }

    const memify = async e => {
        e.preventDefault()
        const box_clone = [...boxes]
        box_clone.forEach((box , idx) => {
            box_clone[idx] = {...box, color : encodeURIComponent(background)}
        })
        setBoxes(box_clone)
        const { data } = await axios.post('/api/makeMeme', {id, box_array : box_clone, caption : caption})
        socket.emit('addNewMeme', data)
        if (data !== null) {
            setWhich({'home' : false, 'makeMeme' : false, 'yourMemes' : true})
            history.push('/home')
        }
    }

    const setBoxText = (idx, val) => {
        const clone = [...boxes]
        clone[idx]['text'] = val
        setBoxes(clone)
    }

    return(
    <Modal show={editing} role ='model-dialog' onHide = {() => setEditing(false)} style={{width: {width}, height:{height}}}>
        <Modal.Header closeButton>
            <Modal.Title>Make you own custom meme!</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "modalBody">
            <img src={url} style ={imgStyle}/>
            {boxes.map(({text}, idx) => (<div className = "textInput">
                <div className = "boxNumber">Box {idx + 1} Text</div>
                <textarea type = "text" value = {text} onChange = {(e) => setBoxText(idx , e.target.value)}/ >
                </div>))
            }
            <div>Caption</div>
            <textarea type = "text" value = {caption} onChange = {(e) => setCaption(e.target.value)} />
            <div className = "bottomPanel">
            <div className = "colorChooser">
            <div style = {{margin: '0 auto', display: 'flex'}}><CompactPicker color={background} style = {{width: `100%`, backgroundColor : 'blue'}} onChangeComplete = {(color) => (setBackground(color.hex))}/></div>
            </div>
            <button className = "memeButton" onClick = {(e) => (memify(e))}>Memify!</button>
            </div>
        </Modal.Body>
    </Modal>)
}

export default MemeModal