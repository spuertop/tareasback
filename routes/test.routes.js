const express = require('express');
const router = express.Router();
const {Movie} = require('../models/TMovies');
const {ActorXMovie} = require('../models/TMovies');
const Actor = require('../models/TActors');


router.post('/newMovie', async (req, res)=>{
    console.log('Console LOG new MOVIE',req.body);
    const movie = await Movie.create(req.body);
    res.json(movie)
})

router.post('/newActor', async(req, res)=>{
    const actor = await Actor.create(req.body)
    res.json(actor)
})

router.get('/allMovies', async(req, res)=>{
    const movies = await Movie.findAll()
    res.json(movies)
})

router.get('/allActors', async(req, res)=>{
    const actors = await Actor.findAll();
    res.json(actors)
})

router.get('/actorsInMovies', async(req, res)=>{
    const actormovie = await ActorXMovie.findAll();
    res.json(actormovie)
})

router.post('/actorInMovie', async(req, res)=>{
    const actorInMovie = await ActorXMovie.create(req.body)
    res.json(actorInMovie)
})

router.get('/actor1', async(req, res)=>{
    const answer = await Actor.findByPk(1,{include: Movie})
    res.json(answer)
})

router.post('/actor1movie2', async(req, res)=>{
    let actor = await Actor.findByPk(1);
    let movie = await Movie.findByPk(3);
    await actor.addMovie(movie);
    res.json(actor)
})


module.exports = router;