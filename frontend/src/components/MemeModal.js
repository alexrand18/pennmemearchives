import React, { useState , useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap'
import '../App.css'
import axios from 'axios'
import { CompactPicker } from 'react-color'
import { Link, useHistory } from 'react-router-dom'

//const imgflipper = new Imglfip({username:'alexrand2018', password: 'alexrand2018'})

const MemeModal = ({editing, setEditing, id , url, name, box_count, height, width}) => {
    
    const [boxes, setBoxes] = useState([])
    const [captions, setCaptions] = useState([])
    const [imgUrl, setImgUrl] = useState('')
    const [background, setBackground] = useState('#ecf1f5')
    const [hasEdited, setHasEdited] = useState(false)

    const history = useHistory()

    useEffect(() => {
        let b = []
        let c = []
        for (let i = 0; i < box_count; i++) {
            b.push({text : '', color : ''})
            c.push('')
        }
        setCaptions(c)
        setBoxes(b)
    }, [editing])


    const imgStyle = {
        width: "100%",
        height: "100%"
    }

    const memify = async e => {
        e.preventDefault()
        const font = 'Arial'
        const color = '#FFA500'
        const box_clone = [...boxes]
        box_clone.forEach((box , idx) => {
            box_clone[idx] = {...box, color : encodeURIComponent(background)}
        })
        setBoxes(box_clone)
        const {data} = await axios.post('/api/makeMeme', {id, box_array : box_clone})
        console.log(data)
        if (data.success === true) {
            history.push('/yourMemes')
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
            {boxes.map(({text}, idx) => (<input type = "text" value = {text} onChange = {(e) => setBoxText(idx , e.target.value)}></input>))
            }
            <CompactPicker color={background} onChangeComplete = {(color) => (setBackground(color.hex))}/>
            <button onClick = {(e) => (memify(e))}></button>
        </Modal.Body>
    </Modal>)
}

export default MemeModal