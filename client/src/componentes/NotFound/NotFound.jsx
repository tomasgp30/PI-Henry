import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"

export default function LandingPage(){
    return(
        <div id="notFound">
            <h1>404</h1>
            <h3>Games Not Found</h3>
            <Link to = '/home'><button>Volver al Home</button></Link>
            <img src="https://i.gifer.com/3KoQ.gif" alt="404 Not Found" /> 
        </div>
        
    )
}