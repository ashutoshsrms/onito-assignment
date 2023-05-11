const connectToDatabase = require('../model/index');
const { error, success } = require('../commanCode/apiResponse');
const { promisify } = require('util');

const connectionPool = connectToDatabase();
const queryAsync = promisify(connectionPool.query).bind(connectionPool);


const longestDurationMovies = async (req, res) => {
  try {
    const sql = `
      SELECT tconst, primaryTitle, runtimeMinutes, genres
      FROM movies
      ORDER BY runtimeMinutes DESC
      LIMIT 10
    `;

    const results = await queryAsync(sql);
    res.status(200).json(success(200, { data: results }));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const topRatedMovies = async (req, res) => {
  try {
    const sql = `
      SELECT movies.tconst, movies.primaryTitle, movies.genres, AVG(ratings.averageRating) AS averageRating
      FROM movies
      JOIN ratings ON movies.tconst = ratings.tconst
      GROUP BY movies.tconst
      HAVING averageRating > 6
      ORDER BY averageRating DESC
    `;

    const results = await queryAsync(sql);
    res.status(200).json(success(200, { data: results }));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const genreMoviesWithSubtotals = async (req, res) => {
  try {
    const sql = `
      SELECT 
        m.genres,
        m.primaryTitle,
        SUM(r.numVotes) AS numVotes
      FROM 
        movies AS m
        JOIN ratings AS r ON m.tconst = r.tconst
      GROUP BY 
        m.genres,
        m.primaryTitle
      WITH ROLLUP
    `;

    const results = await queryAsync(sql);
    res.status(200).json(success(200, { data: results }));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const addMovie = async (req, res) => {
  const { tconst, primaryTitle, runtimeMinutes, genres } = req.body;

  try {
    const sql = `
      INSERT INTO movies (tconst, primaryTitle, runtimeMinutes, genres)
      VALUES (?, ?, ?, ?)
    `;

    await queryAsync(sql, [tconst, primaryTitle, runtimeMinutes, genres]);
    res.status(200).send(success(200));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};




const updateRuntime = async (req, res) => {
  const query = `
    UPDATE movies
    SET runtimeMinutes = 
      CASE
        WHEN genres = 'Documentary' THEN runtimeMinutes + 15
        WHEN genres = 'Animation' THEN runtimeMinutes + 30
        ELSE runtimeMinutes + 45
      END
  `;
  try {
    await queryAsync(query);
    res.status(200).send(success(200));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports = {
  longestDurationMovies,
  topRatedMovies, 
  genreMoviesWithSubtotals,
  addMovie,
  updateRuntime
}



