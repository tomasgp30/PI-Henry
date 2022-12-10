import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions";
import Loading from "../Loading/Loading.jsx"
import "./NotFound.css";


export default function NotFound(){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    
    async function volver() {
        setLoading(true)
        await dispatch(getVideogames())
        setLoading(false)

    }


    return(
        <div>
            {loading ? (
                <Loading/>
            ):(
           <div id="notFound">
                <h1>404</h1>
                <h3>Games Not Found</h3>
                <button onClick={() => volver()}>Volver al Home</button>
                <img src="https://i.gifer.com/3KoQ.gif" alt="404 Not Found" /> 
            </div>
            )} 
        </div>
        
        
    )
}