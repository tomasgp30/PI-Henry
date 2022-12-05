
const initialState = {
    games: [],
    totalGames: [],
    genres: []
}


function rootReducer (state = initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                games: action.payload,
                totalGames: action.payload
            }
        case 'FILTER_BY_CREATED':
            var allGames = state.totalGames
            const valueFiltered = action.payload === 'created' ? allGames.filter(e => e.ceatedInDb) : allGames.filter(e => !e.ceatedInDb)
            return {
                ...state,
                games: action.payload === 'All' ? state.totalGames : valueFiltered
            }
        case 'FILTER_BY_RATING':
            var allGames = state.totalGames
            const ratingFiltered = action.payload === 'Asc' ? allGames.sort((a, b) => a.rating - b.rating) : allGames.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                games: ratingFiltered
            }
        case 'FILTER_BY_ALF':
            var allGames = state.totalGames
            const alfFiltered = action.payload === 'Alf Asc' ? allGames.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;}) : allGames.sort((a, b) => {
              if (b.name < a.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;})
            return {
                ...state,
                games: alfFiltered
            }
        case 'GET_NAME_GAME':
            return {
                ...state,
                games: action.payload
            }
        case 'POST_GAME':
            return{
                ...state,
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        default:
            return state
    }

}

export default rootReducer