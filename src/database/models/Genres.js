const { sequelize, Datatypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
  }, {
    tableName: 'genres',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
  });
  Genre.associate = function(models) {
    Genre.hasMany(models.Movie, {
      as: 'movies',
      through: 'movies_genres',
      foreignKey: 'genre_id',
      otherKey: 'movie_id',
      timestamps: false,
    });
  };
  return Genre;
};
  