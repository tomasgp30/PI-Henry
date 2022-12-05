import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameGame} from "../../actions";

export default function SearchBar(){
    const disptach = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        disptach(getNameGame(name))
    }

    return (
        <div>
            <input type= "text" placeholder="Busca un juego" onChange={e => handleInputChange(e)}/>
            <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
}


