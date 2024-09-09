const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your sequelize instance

const Drama = sequelize.define('Drama', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alternative_title: {
        type: DataTypes.STRING
    },
    url_photo: {
        type: DataTypes.TEXT
    },
    year: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING
    },
    synopsis: {
        type: DataTypes.TEXT
    },
    availability: {
        type: DataTypes.STRING
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    actor: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    link_trailer: {
        type: DataTypes.TEXT
    },
    award: {
        type: DataTypes.STRING
    },
    trailer_yt: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'dramas',
    timestamps: false // Set to true if you want to use createdAt and updatedAt columns
});

module.exports = Drama;
