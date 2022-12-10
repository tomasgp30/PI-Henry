const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame,Genre} = require('../db')
const { API_KEY } = process.env
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//API : 'https://api.rawg.io/api/games?key=bd6e2c37ea93483e8ac20c6cf6986e5e'


//Buscamos la Info de la API
const getApiInfo = async () => {
    var apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25`, {headers:{'Accept-Encoding': 'null'}});
    var gamesInfo = []
    for(let i = 1; i <= 4; i++){
        var apiInfo = await apiUrl.data.results.map(e => {
            return{
                id: e.id,
                name: e.name,
                img: e.background_image,
                date: e.released,
                rating: e.rating,
                genres: e.genres.map(e => e.name),
                platforms: e.platforms.map(e => e.platform.name)
            };
        });
        var gamesInfo = gamesInfo.concat(apiInfo)
        apiUrl = await axios.get(apiUrl.data.next, {headers:{'Accept-Encoding': 'null'}})
    }
    return gamesInfo
}

//Buscamos la info de la Base de Datos
const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model:Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};
//Juntamos toda la informacion obtenida anteriormente
const getAllGames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

// GET ALL GAMES O POR QUERY
router.get('/videogames', async (req, res) => {
    const name = req.query.name
    let totalGames = await getAllGames();
    if(name){
        try {
            let game = await totalGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(game.length){ 
            res.status(200).json(game)
            }
        } catch (error) {
            res.status(404).send(`No se encontro el juego ${name}`)
        }
        
    }else res.status(200).json(totalGames)
})

// GET GAME POR ID
router.get('/videogame/:id', async (req, res) => {
    const { id } = req.params;
    let totalGames = await getAllGames();
        try {
            let game = await totalGames.filter(e => e.id === id)
            if(game.length){ 
            res.status(200).json(game)
            }
        } catch (error) {
            res.status(404).send(`No se encontro el juego con el id ${id}`)
        }
})

//GET ALL GENRES
router.get('/genres', async (req, res) =>{
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, {headers:{'Accept-Encoding': 'null'}});
    const genres = genresApi.data.results.map(e => e.name)
    genres.forEach(e => {
        Genre.findOrCreate({
            where: { name: e }
        })        
    });
    res.status(200).json(genres)
})

// PUBLICAR JUEGO
router.post('/videogames', async (req, res) =>{
    const {name, description, date, img, rating, platforms, createdInDb, genres} = req.body
    const gameCreated = await Videogame.create({
        name, 
        description, 
        date, 
        img,
        rating, 
        platforms,
        createdInDb
    })
    const genreDb = await Genre.findAll({
        where: {name : genres}
    })
    
    gameCreated.addGenre(genreDb)
    res.status(200).json('Juego creado con exito')
})


module.exports = router;
