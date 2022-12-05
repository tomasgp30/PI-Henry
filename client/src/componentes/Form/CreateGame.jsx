import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import {postGame, getGenres} from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";
import "./CreateGame.css"

function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un Nombre'
    }
    if(!input.description){
        errors.description = 'Se requiere una descripcion'
    }
    if(!input.date){
        errors.date = 'Se requiere una fecha de lanzamiento'
    }else if(!/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/.test(input.date)){
        errors.date = 'El formato de la fecha es incorrecto'
    }
    if(!input.img){
        errors.date = 'Se requiere una imagen'
    }
    if(!input.rating){
        errors.date = 'Se requiere el rating'
    }
    if(!input.platforms){
        errors.platforms = 'Se requiere al menos una plataforma'
    }
    if(!input.genres){
        errors.genres = 'Se requiere al menos un genero'
    }
}

export default function CreateGame(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"", 
        description:"", 
        date:"", 
        img:"",
        rating:"", 
        platforms:[],
        genres:[],

    })

    
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(errors) return alert('Hubo un error al enviar el juego!!')
        dispatch(postGame(input))
        alert("Juego creado!!")
        setInput({
            name:"", 
            description:"", 
            date:"", 
            img:"",
            rating:"", 
            platforms:[],
            genres:[],
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);
    
    return(
        <div id="fondo">
            <div id="contenedor" className="filter">
                <Link to = '/home'><button id="volver">Volver al Home</button></Link>
                <h1>Crea tu juego</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={input.name} name="name" key={input.name} onChange={e => handleChange(e)}/>
                    </div>
                    <div>   
                        <label>Fecha de lanzamiento:</label>
                        <input type="text" value={input.date} name="date" key={input.date} onChange={e => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type="text" value={input.image} name="img" key={input.image} onChange={e => handleChange(e)}/>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type="number" value={input.rating} name="rating" key={input.rating} onChange={e => handleChange(e)}/>
                    </div>
                     <div>   
                        <label>Descripcion del juego:
                        <textarea rows="3" cols="30"  value={input.description} name="description"  key={input.description} onChange={e => handleChange(e)}/>
                        </label>
                    </div>
                    <div>
                        <label>Plataformas:</label>
                        <label><input type="checkbox" name="platforms" value="PC" onChange={e => handleCheck(e)}/>PC</label>
                        <label><input type="checkbox" name="platforms" value="PS3" onChange={e => handleChange(e)}/>Ps3</label>
                        <label><input type="checkbox" name="platforms" value="PS4" onChange={e => handleChange(e)}/>Ps4</label>
                        <label><input type="checkbox" name="platforms" value="PS5" onChange={e => handleChange(e)}/>Ps5</label>
                        <label><input type="checkbox" name="platforms" value="Xbox360" onChange={e => handleChange(e)}/>Xbox 360</label>
                        <label><input type="checkbox" name="platforms" value="XboxOne" onChange={e => handleChange(e)}/>Xbox One</label>
                        <label><input type="checkbox" name="platforms" value="XboxSeriesX" onChange={e => handleChange(e)}/>Xbox Series X</label>
                        <label><input type="checkbox" name="platforms" value="Switch" onChange={e => handleChange(e)}/>Switch</label>
                        <label><input type="checkbox" name="platforms" value="Mobile" onChange={e => handleChange(e)}/>Mobile</label>
                    </div>
                    <div>
                        <label>Generos:</label>
                        {genres.map((gen) => (
                            <label><input type="checkbox" name="genres" value={gen} onChange={e => handleChange(e)}/>{gen}</label>
                        ))}
                    </div>
                    <div>
                        <button id="crear" type="submit" >Crear Juego</button>
                    </div>
                </form>
            </div>
        </div>
    )


}