const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}
Character.init({
    name:{
        type: DataTypes.STRING,
        notNull: true,
        notEmpty: true
    },
    img: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weigth: DataTypes.DECIMAL,
    bio: DataTypes.TEXT
}, {
    sequelize,
    modelName: "character",
    timestamps: false
});

module.exports = Character;