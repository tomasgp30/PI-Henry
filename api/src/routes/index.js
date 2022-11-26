const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame,Genre} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Buscamos la Info de la API
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.rawg.io/api/games?key=bd6e2c37ea93483e8ac20c6cf6986e5e')
    const apiInfo = await apiUrl.data.map(e => {
        return{
            name: e.name,
            img: e.background_image,
            rating: e.rating,
            platforms: e.parent_platforms.map(e => e)
        };
    });
    return apiInfo
};

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

// GET GAMES
router.get('/games', async (req, res) => {
    const name = req.query.name
    let totalGames = await getAllGames();
    if(name){
        try {
            let game = await totalGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(game.length){ 
            res.status(200).json(game)
            }
        } catch (error) {
            res.status(404).json(error)
        }
        
    }else{
        res.status(200).send(totalGames)
    }
})


module.exports = router;
