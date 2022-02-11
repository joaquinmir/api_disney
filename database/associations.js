const Movie = require('./models/Movie');
const Genre = require('./models/Genre');
const Character = require('./models/Character');


//Genre has many movies & Movie belongs to genre.

Genre.hasMany(Movie);
Movie.belongsTo(Genre);

//Movie has many characters && Character has many movies.

Character.belongsToMany(Movie, { through: "character_movie" });
Movie.belongsToMany(Character, { through: "character_movie" });
