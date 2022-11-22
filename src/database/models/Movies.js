const { sequelize, Datatypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let alias = 'Movie'; 
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    rating: DataTypes.DECIMAL(3, 1),
    awards: DataTypes.INTEGER,
    release_date: DataTypes.DATE,
    length: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER,
  }, {
    tableName: 'movies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    underscored: true,
  });
  Movie.associate = function(models) {
    Movie.belongsTo(models.Genre, {
      as: 'genre',
      through: 'movies_genres',
      foreignKey: 'genre_id',
      otherKey: 'movie_id',
      timestamps: false,
    });
  };
  return Movie;
};
