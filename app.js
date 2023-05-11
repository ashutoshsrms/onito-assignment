const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config.json');
const {BASE_API}=config;
console.log(BASE_API);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello world');
});

const getMoviesInfoRoutes = require('./src/routes/movies.routes');

app.use(BASE_API,getMoviesInfoRoutes);


const PORT = process.env.PORT || 4000;
//server
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
