import React from "react";
import "./Paginado.css";


export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumbers = []

    for (let i = 1; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
    return(
        <nav>
            <ul >
                { pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}