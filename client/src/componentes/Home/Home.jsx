import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//importacion de Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//importacion de accions
import { getVideogames, filterGamesCreated, filterGamesByRating, filterGamesByAlf} from "../../actions/index.js";
//importacion componentes
import Cards from "../Cards/Cards.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import Loading from "../Loading/Loading.jsx"
import NotFound from "../NotFound/NotFound.jsx"
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.css"


export default function Home (){
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexLastGame = currentPage * gamesPerPage;
    const indexFirstGame = indexLastGame - gamesPerPage
    const currentGames = allGames.slice(indexFirstGame, indexLastGame)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(async () => {
        setLoading(true)
        await dispatch(getVideogames());
        setLoading(false)
    },[dispatch])

    function handleFilterByCreated(e){
        dispatch(filterGamesCreated(e.target.value));
    }

    function handleFilterByRating(e){
        dispatch(filterGamesByRating(e.target.value))
    }

    function handleFilterByAlf(e){
        dispatch(filterGamesByAlf(e.target.value))
    }


    return (
        <div id = 'homeShowcase'>
            {loading ? (
                <Loading/>
            ) : ( 
                <div>
                {currentGames.length === 0 ? (
                    <NotFound/>
                ) : (
                    <div>
                        <nav id="nav" className="blur">
                            <Link to= '/videogame'>Crear juego</Link>
                            <img id="logo" src="./Gamepedia.png" alt="Logo Not Found" />
                            <SearchBar/>
                            <div>
                            <select onChange={e => handleFilterByAlf(e)}>
                                <option value = 'Alf Asc'>Alfabeticamente Ascendente</option>
                                <option value = 'Alf Des'>Alfabeticamente Descendente</option>
                            </select>
                            <select onChange={e => handleFilterByRating(e)}>
                                <option value = 'Asc'>Rating Ascendente</option>
                                <option value = 'Des'>Rating Descendente</option>
                            </select>
                            <select onChange={e => handleFilterByCreated(e) }>
                                <option value = 'All'>Todos</option>
                                <option value = 'api'>Existente</option>
                                <option value = 'created'>Creados</option>
                            </select>
                            </div>
                        </nav>
                        <div>
                            <Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado} />
                            <Fragment>
                                <Cards currentGames={currentGames} />
                            </Fragment>
                        </div>
                        <footer>
                            <p>Creado por Tomas Garcia</p>
                            <a  href="https://github.com/tomasgp30">
                                <img id='gitHub' src="https://img.freepik.com/iconos-gratis/github_318-698188.jpg?w=2000" alt="GitHub" />
                            </a>      
                        </footer>
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}
