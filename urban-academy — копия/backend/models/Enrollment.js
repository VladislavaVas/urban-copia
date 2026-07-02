const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Class = require('./Class');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
}, { 
  timestamps: true, 
  tableName: 'enrollments' 
});

// Ассоциации – foreignKey указывает на поля в модели Enrollment
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Enrollment.belongsTo(Class, { foreignKey: 'classId' });
User.hasMany(Enrollment, { foreignKey: 'user_id' });
Class.hasMany(Enrollment, { foreignKey: 'class_id' });

module.exports = Enrollment;