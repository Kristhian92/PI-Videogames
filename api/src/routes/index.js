const { Router } = require("express");
const axios = require("axios");
const {Videogame, Genre} = require("../db.js");
const {API_KEY} = process.env;
const {infoTotal, infoApi, nameApi, infoDB} = require('../controllers')


const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



router.get('/videogames', async (req, res, next) => {
        const { name } = req.query; //el nombre me llega por query
        let allVideogames = await infoTotal()
    
        if(name) { 
            try { 
                const foundGamesAPI = await nameApi(name)
                const gamesByNameDB = await infoDB()
                let foundGamesDB =  gamesByNameDB.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                let allResults = foundGamesDB.concat(foundGamesAPI)
                allResults.length ? res.status(200).send(allResults.slice(0,15)) : res.status(400).send('No hay un videojuego con dicho nombre')
    
            } catch(err) {
                next(err)
            }
        }
        else {
            res.send(allVideogames)
            return
        }
        })


router.get('/platforms', async (req, res, next) => {
        
            try {
                const all = await infoApi();
                const allPlatforms = [];
                all.map(g => g.platforms.map(p => {
                    if(!allPlatforms.includes(p)) {
                        allPlatforms.push(p)
                    }
                }))
            
                allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send('Error')
        
                }catch(e) {
                    next(e)
                }
            })        


router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params
    if (idVideogame.includes('-')) {
        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb)
    };

    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        let { name, background_image, genres, description, released, rating, platforms } = response.data;
        genres = genres.map(g => g.name);
        platforms = platforms.map(p => p.platform.name);
        return res.json({
            name,
            background_image,
            genres,
            description,
            released,
            rating,
            platforms
        })
    } catch (err) {
        return console.log(err)
    }
})
    

    
    

router.get('/genres', async (req, res) => {
    
    try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genresApi = await respuesta.data.results.map(g => g.name)
        //console.log('estos son los generos: ', genresApi)

        genresApi.map(e => Genre.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
            where: {name: e} //
        }))

        const allGenres = await Genre.findAll() //me traigo todos los generos que guarde en mi db
        res.json(allGenres)

    }catch(e) {
        next(e)
    }

})


router.post('/videogame', async (req, res, next) => {
    const {name, genres, released, background_image, rating, platforms, description} = req.body
       //la accion de crear una nueva instancia es asincrona, como manejo errores? con try y catch
    try {
        let newVideogame = await Videogame.create ({ //le paso al create el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
            name,
            released,
            background_image,
            rating,
            platforms,
            description
            
        })
        const relacion = await Genre.findAll({ //en generos, buscame todos aquellos
            where: { //donde
                name: genres
            }
        })
        await newVideogame.addGenres(relacion) //a mi juego creado, le agrego algun genero
        res.json(newVideogame)

    } catch(e) {
        next(e)
    }
})





module.exports = router;
