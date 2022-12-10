import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import {postGame, getGenres} from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";
import "./CreateGame.css"

function validate(input) {
    let errors = {};
    if(input.name === ""){
        errors.name = 'Se requiere un Nombre'
    }
    if(input.description === ""){
        errors.description = 'Se requiere una descripcion'
    }
    if(input.date === ""){
        errors.date = 'Se requiere una fecha de lanzamiento'
    }else if(!/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/.test(input.date)){
        errors.date = 'El formato de la fecha es incorrecto'
    }
    if(input.img === ""){
        errors.img = 'Se requiere una imagen'
    }
    if(input.rating === ""){
        errors.rating = 'Se requiere el rating'
    }
    if(!input.platforms.length){
        errors.platforms = 'Se requiere al menos una plataforma'
    }
    if(!input.genres.length){
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
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(errors)
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
                        <label className="desc" id="title1" for="name">Nombre</label>
                        <div>
                            <input type="text" id="Field1" className="field text fn" value={input.name} name="name" size="8" tabIndex="1" onChange={e => handleChange(e)}/>
                        </div> 
                    </div>
                    <div>   
                        <label className="desc" id="title3" for="date">Fecha de lanzamiento</label>
                        <div>
                            <input className="desc" id="Field3" type="text" value={input.date} name="date" maxLength="10" onChange={e => handleChange(e)}/>
                        </div>                     
                    </div>
                    <div>
                        <label className="desc" id="title3" for="img">Imagen</label>
                        <div>
                            <input className="desc" id="Field3" type="text" value={input.image} name="img"  onChange={e => handleChange(e)}/>
                        </div>
                    </div>
                    <div>
                        <label className="desc" id="title3" for="rating">Rating</label>
                        <div className="rating">
                            <label>
                            <input type="radio" name="rating" value="1" onChange={e => handleChange(e)}/>
                              <span class="icon">★</span>
                            </label>
                            <label>
                              <input type="radio" name="rating" value="2" onChange={e => handleChange(e)}/>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                            </label>
                            <label>
                              <input type="radio" name="rating" value="3" onChange={e => handleChange(e)}/>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>   
                            </label>
                            <label>
                              <input type="radio" name="rating" value="4" onChange={e => handleChange(e)}/>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                            </label>
                            <label>
                              <input type="radio" name="rating" value="5" onChange={e => handleChange(e)}/>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                              <span class="icon">★</span>
                            </label>
                        </div>
                    </div>
                     <div>   
                        <label className="desc" id="title4" for="description">Descripcion del juego</label>
                        <div>
                            <textarea id="Field4" spellCheck="true" rows="10" cols="50" tabIndex="4" value={input.description} name="description"  onChange={e => handleChange(e)}/>
                        </div>
                    </div>
                    <div>
                        <fieldset>
                            <legend id="title6" className="desc">Plataformas</legend>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="PC" tabIndex="8" onChange={e => handleCheck(e)}/>PC</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="PS3" tabIndex="8" onChange={e => handleChange(e)}/>Ps3</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="PS4" tabIndex="8" onChange={e => handleChange(e)}/>Ps4</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="PS5" tabIndex="8" onChange={e => handleChange(e)}/>Ps5</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="Xbox360" tabIndex="8" onChange={e => handleChange(e)}/>Xbox 360</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="XboxOne" tabIndex="8" onChange={e => handleChange(e)}/>Xbox One</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="XboxSeriesX" tabIndex="8" onChange={e => handleChange(e)}/>Xbox Series X</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="Switch" tabIndex="8" onChange={e => handleChange(e)}/>Switch</label>
                            <label className="choice"><input id="Field6" type="checkbox" name="platforms" value="Mobile" tabIndex="8" onChange={e => handleChange(e)}/>Mobile</label>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Generos</legend>
                            {genres.map((gen) => (
                                <label className="choice"><input id="Field6" type="checkbox" name="genres" value={gen} tabIndex="8" onChange={e => handleChange(e)}/>{gen}</label>
                            ))}
                        </fieldset>
                    </div>
                    <div>
                        <button id="crear" type="submit" >Crear Juego</button>
                    </div>
                </form>
            </div>
        </div>
    )


}