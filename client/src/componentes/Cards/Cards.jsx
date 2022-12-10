import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import  "./Cards.css"

export default function Cards(props){
    console.log(props.currentGames)
    return( 
        <div className="cards">
            {props.currentGames?.map(e => {
                return (
                    <Link to={'/home/:' + e.id}>
                        <Card name={e.name} image={e.img} genres={e.genres} key={e.id}/>
                    </Link>                
                )
            })}
        </div>
    )
}