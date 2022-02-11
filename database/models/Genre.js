const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Genre extends Model {}
Genre.init({
    name:{
        type: DataTypes.STRING,
        notNull: true,
        notEmpty: true,
        primaryKey: true
    },
    img: DataTypes.STRING
}, {
    sequelize,
    modelName: "genre",
    timestamps: false
});

module.exports = Genre;