const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DanceStyle = sequelize.define('DanceStyle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: DataTypes.TEXT,
}, { timestamps: false, tableName: 'dance_styles' });

module.exports = DanceStyle;