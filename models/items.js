module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
  	id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true},
  	title: DataTypes.STRING,
  	body: DataTypes.TEXT,
  	status: DataTypes.BOOLEAN,
  })
};