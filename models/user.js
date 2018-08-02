'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    nombre: DataTypes.STRING,
    apellido1: DataTypes.STRING,
    apellido2: DataTypes.STRING,
    correo: DataTypes.STRING,
    curso: DataTypes.STRING,
    codigo: DataTypes.STRING,
    enviado: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
