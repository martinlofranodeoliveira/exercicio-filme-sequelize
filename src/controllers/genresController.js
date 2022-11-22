const db = require('../database/models');
const Genres = db.Genre;
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const genresController = {
    list: (req, res) => {
        Genres.findAll({
                include: {
                    model: db.Movie, as : 'movies',
                    association: 'movies',
                    attributes: ['title'],
                    as: 'movies',
                    required: true
                }})
            .then(genres => {
                return res.render('genresList', { genres });
            })
    },
    detail: (req, res) => {
        Genres.findByPk({
                include: {
                    model: db.Movie, as : 'movies',
                    association: 'movies',
                    attributes: ['title'],
                    as: 'movies',
                    required: true
                }})
            .then(genre => {
                return res.render('genresDetail', { genre });
            })
    },
    new: (req, res) => {
        return res.render('genresNew');
    },
    create: (req, res) => {
        Genres.create({
            name: req.body.name,
            ranking: req.body.ranking,
            active: req.body.active
        })
            .then(() => {
                return res.redirect('/genres');
            })
    },
    edit: (req, res) => {
        Genres.findByPk(req.params.id)
            .then(genre => {
                return res.render('genresEdit', { genre });
            })
    },
    update: (req, res) => {
        Genres.update({
            name: req.body.name,
            ranking: req.body.ranking,
            active: req.body.active
        }, {
            where: {
                id_genre: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/genres');
            })
    },
    delete: (req, res) => {
        Genres.destroy({
            where: {
                id_genre: req.params.id
            }
        })
            .then(() => {
                return res.redirect('/genres');
            })
    }
}

module.exports = genresController;