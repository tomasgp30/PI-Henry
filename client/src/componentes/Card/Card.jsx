import React from "react";
import  "./Card.css"

export default function Card({ name, image, genres }){
    return (
        <div className="card">
            <img src={image} className="card__image" alt="Not found" />
            <div className="card__overlay">
                <div className="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>           
                    <div className="card__header-text">
                        <h3 className="card__title">{name}</h3>
                        <h5 className="card__status">{genres.map(e => e + "  ")}</h5> 
                    </div>         
                </div>   
                <p className="card__description">Mas Informacion</p>       
            </div>
        </div>
    );
}