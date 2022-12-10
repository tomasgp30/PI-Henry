const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    },
    ceatedInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    
  });
};
