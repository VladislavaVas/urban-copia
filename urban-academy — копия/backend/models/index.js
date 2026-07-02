const sequelize = require('../config/db');
const User = require('./User');
const DanceStyle = require('./DanceStyle');
const Class = require('./Class');
const Enrollment = require('./Enrollment');

module.exports = { sequelize, User, DanceStyle, Class, Enrollment };