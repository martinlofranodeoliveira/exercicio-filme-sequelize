const db = require('../database/models');
const Movies = db.Movie;
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const moviesController = {
    index: (req, res) => {
        Movies.findAll({
                include: {
                    model: db.Genre, as : 'genres',
                    association: 'genre',
                    attributes: ['name'],
                    as: 'genre',
                    required: true
                }
            })
            .then(movies => {
                return res.render('moviesList', { movies });
            })
    },
    detail: (req, res) => {
        Movies.findByPk({
                include: {
                    model: db.Genre, as : 'genre',
                    association: 'genre',
                    attributes: ['name'],
                    as: 'genre',
                    required: true  
                    }})
            .then(movie => {
                return res.render('moviesDetail', { movie });
            })
    },
    new: (req, res) => {
        return res.render('moviesNew');
    },
    create: (req, res) => {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        })
            .then(() => {
                return res.redirect('/movies');
            })
    },
    edit: (req, res) => {
        Movies.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesEdit', { movie });
            })
    },
    update: (req, res) => {
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/movies');
            })
    },
    delete: (req, res) => {
        Movies.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/movies');
            })
    }
}

module.exports = moviesController;


