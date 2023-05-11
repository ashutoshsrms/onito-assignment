const moviesController= require('../controllers/movies.controller');
const router=require('express').Router();

router.get('/longest-duration-movies',moviesController.longestDurationMovies);
router.get('/top-rated-movies',moviesController.topRatedMovies);
router.get('/genre-movies-with-subtotals',moviesController.genreMoviesWithSubtotals);
router.post('/new-movie',moviesController.addMovie);
router.post('/update-runtime-minutes',moviesController.updateRuntime);
module.exports = router;    