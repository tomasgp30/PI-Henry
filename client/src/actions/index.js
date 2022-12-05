import axios from 'axios';


export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type:'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        var info = await axios.get("http://localhost:3001/genres", {

        });
        return dispatch({ type:'GET_GENRES', payload: info.data })
    }
}

export function postGame(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/videogames", payload);
        console.log(response);
        return response;
    }
}


export function filterGamesCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function filterGamesByRating(payload){
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterGamesByAlf(payload){
    return{
        type: 'FILTER_BY_ALF',
        payload
    }
}

export function getNameGame(name){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name)
            console.log(name)
            return dispatch({
                type: 'GET_NAME_GAME',
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    } 
}

