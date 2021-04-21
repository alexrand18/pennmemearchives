import React, { useState , useEffect } from 'react'
import { Card } from 'react-bootstrap'
import '../App.css'

const Meme = ({url, name, id, modalFunc, width, height, box_count}) => {

    return (
            <Card className = "memeCard" onClick = {() => modalFunc({url, name, id, width, height, box_count})}>
                <Card.Img variant = "top" className = "memeImg" src = {url}/>
                <Card.Footer>
                    <small className="text-muted">{name}</small>
                </Card.Footer>
            </Card>
    )
}

export default Meme