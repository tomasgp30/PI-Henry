import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return(
        <div id = 'showcase'>
           <div>
            <Link to = '/home'>
                <button id='ingreso'>Ingresar</button>
            </Link>
            </div> 
        </div>
        
    )
}