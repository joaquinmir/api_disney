const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');



class Movie extends Model {}
Movie.init({
    title:{
        type: DataTypes.STRING,
        notNull: true,
        notEmpty: true
    },
    img: DataTypes.STRING,
    release_date: {
        type: DataTypes.DATEONLY,
        isDate: true
    },
    rating:{
        type: DataTypes.INTEGER,
        max: 5,                
        min: 1
    } 
}, {
    sequelize,
    modelName: "movie",
    timestamps: false
});

module.exports = Movie;