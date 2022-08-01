const axios = require('axios');
const {Videogame, Genre} = require('../db.js');
const {API_KEY} = process.env;



const infoApi = async() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let videojuegos = []
    try {
        for(let i=0; i<5; i++) { //con un for recorro mi API, ya que es un arreglo, 5 veces
            const respuesta = await axios.get(url) //realizo la peticion
            //en mi .data podemos encontrar dos propiedades, results que es es aquello que voy a mapear
            respuesta.data.results.map(v => { //a la respuesta/resultado lo mapeo
                videojuegos.push({ //y pusheo en mi array vacio todo aquello que mapee
                    id: v.id,
                    name: v.name,
                    background_image: v.background_image,
                    released: v.released,
                    rating: v.rating,
                    platforms: v.platforms?.map(el => el.platform.name),
                    genres: v.genres?.map(el => el.name)
                })
            });
            //y next que es donde voy a entrar para pasar a la siguente pagina.
            url = respuesta.data.next
        }
        return videojuegos

    } catch(e) {
        console.log(e)
    }
};



const infoDB = async () => {
    try {
    return await Videogame.findAll({ //SELECT * FROM Videogame 
           include: [{
               model: Genre, 
               atributes: ['name'], 
               throught: { 
                   attributes: [] 
               }
           }]
       })
    } catch(e) {
        console.error(e)
    }
}



const infoTotal = async () => {
    //para unir mis dos solicitudes, guardo en una variable la ejecucion de mis funciones
    const apiData = await infoApi ();
    const dbData = await infoDB();
    //ahora uno mis dos constantes contenedoras de funciones
    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
}


const nameApi = async (name) => {
    const infoSearch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`) 
    //console.log(infoSearch) //infoSearch = {{[]}} => me llega un objeto, que tiene una propiedad data y que a su vez tiene una propiedad results que es un []

    try {
        const vgSearch = await infoSearch.data.results.map(el => { //[{}, {}, {}]
            return {
                id: el.id,
                name: el.name,
                released: el.released,
                background_image: el.background_image,
                rating: el.rating,
                platforms: el.platforms?.map(el => el.platform.name),// [{platfom{}}] => [""]
                genres: el.genres?.map(el => el.name) // [{}] => ['']
            }
        })
        return vgSearch; //=> [{}]
    }catch(e) {
        console.error(e)
    }
}


const idApi = async (id) => {
    try {
        const rtaApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        if(rtaApi) {
            const vgId = await rtaApi.data
            const info = {
                id: vgId.id,
                name: vgId.name,
                background_image: vgId.background_image,
                genres: vgId.genres?.map(g => g.name),
                description: vgId.description,
                released: vgId.released,
                rating: vgId.rating,
                platforms: vgId.platforms?.map(el => el.platform.name)

            }
            return info
        } else {
            return("No hay un videojuego con ese id")
        }

    } catch(e) {
        console.error(e)
    }
}


const idDb = async (id) => {
    try {
    return await Videogame.findByPk(id, {
        include: [{
            model: Genre, 
            atributes: ['name'], 
            throught: { 
                attributes: [] 
            }
        }]
       })
    } catch(e) {
        console.error(e)
    }
}


const videogame = async (id) => {
    const dbID = id.includes("-")
    if(dbID) { //si mi id contiene un signo "-"
        const vgDb = await idDb(id);
        return vgDb     
    } else {
        const vgApi = await idApi(id);
        return vgApi
   }
}


module.exports = {
    infoTotal,
    videogame,
    infoApi,
    infoDB,
    nameApi
}

























// const {Videogame} = require('../db.js');
// const { v4: uuidv4 } = require('uuid');
// const axios = require('axios');

// async function getApiVideogames()  {
     
// }

// function getById(req, res, next)  {
//     const id = req.params.id
    
//     return Videogame.findByPk(id)
//     .then((videogame) => res.send(videogame))
//     .catch((err) => next(err));
    
// };

// function addVideogame(req, res, next) {
     
//      const videogame = req.body;

//     return Videogame.create({
//         ...videogame,
//         id: uuidv4(), 
//     })
//     .then((videogames) => res.send(videogames))
//     .catch((err) => next(err));
    
// };

// function updateVideogame(req, res, next) {
     
//     const id = req.params.id;
//     const videogame = req.body;

//    return Videogame.update( videogame, {
//     where: { 
//         id,
//     }
//    })
      
//    .then((updateCharacter) => res.send(updateCharacter))
//    .catch((err) => next(err));
   
// };
   
// function deleteVideogame(req, res, next) {
//     const id = req.params.id 
    

//    return Videogame.destroy({
//     where: { 
//         id,
//     }})
//    .then(() => res.sendStatus(200))
//    .catch((err) => next(err));
// };

// module.exports = {
//     getAllVideogames,
//     getById,
//     addVideogame,
//     updateVideogame,
//     deleteVideogame

// }