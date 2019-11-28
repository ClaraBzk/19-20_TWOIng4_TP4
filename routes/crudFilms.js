var express = require('express');
var router = express.Router();
var lodash = require('lodash');
const axios = require('axios').default;

// GET localhost:3000/movies -- Affiche tout les films

router.get('/', (req, res) => {
  res.status(200).json({mesFilms});
});

// GET localhost:3000/movies/:id -- Affiche un film via son id

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const film = lodash.find(mesFilms, ["id", id]);

  res.status(200).json({
  message: 'Film trouvé !',
  film 
});

});

// PUT localhost:3000/movies/ -- Ajoute un film via son nom

router.put('/', (req, res) => {

  const {nomFilm} = req.body;
  const id = lodash.uniqueId();
  
  axios({
    method : 'get',
    url: `http://www.omdbapi.com/?t=${nomFilm}&apikey=60f0c27b`,
    responseType: 'json'

  })
  .then(function(response)
  {
    yearOfRelease = response.data.Year;
    duration =  response.data.Runtime;
    actors = response.data.Actors;
    poster =  response.data.Poster;
    boxOffice = response.data.BoxOffice;
    rottenTomatoesScore = response.data.Ratings[2].Value;

    
    mesFilms.push({nomFilm, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore,id});

    console.log( `Le film ${id} est ajouté`)
  });
  

});


// POST localhost:3000/movies/:id -- Update un film via son id

router.post('/:id', (req, res) => {
  const { id } = req.params;

  const {nomFilm, yearOfRelease, duration, actors, poster, boxOffice, rottenTomatoesScore} = req.body;

      const filmUpdate = lodash.find(mesFilms, ["id", id]);

      filmUpdate.nomFilm = nomFilm;
      filmUpdate.yearOfRelease = yearOfRelease;
      filmUpdate.duration = duration;
      filmUpdate.actors = actors;
      filmUpdate.poster = poster;
      filmUpdate.boxOffice = boxOffice;
      filmUpdate.rottenTomatoesScore = rottenTomatoesScore;
    
      res.json({
        message: `Film mis a jour: ${id}`,
        film : filmUpdate
      });
    
  });

 
  // DELETE localhost:3000/movies/:id -- Efface un film via son id
 
  router.delete('/:id', (req, res) => {

    const { id } = req.params;

  lodash.remove(mesFilms, ["id", id]);

  res.json({
    message: `Film enlevé: ${id}`
  });

});

  module.exports = router;
