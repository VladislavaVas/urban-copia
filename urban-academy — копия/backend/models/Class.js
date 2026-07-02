const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const DanceStyle = require('./DanceStyle');

const Class = sequelize.define('Class', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  instructor: DataTypes.STRING,
  schedule: DataTypes.STRING,
  maxSeats: { type: DataTypes.INTEGER, defaultValue: 10 },
  image_url: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: true, tableName: 'classes' });

Class.belongsTo(DanceStyle, { foreignKey: 'style_id', as: 'style' });
DanceStyle.hasMany(Class, { foreignKey: 'style_id' });

module.exports = Class;