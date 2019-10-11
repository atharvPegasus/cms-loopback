'use strict';

var async = require('async');

module.exports = function(Movies) {

    Movies.getMovieTitle = function(data,cb) {
        console.log("data is --",data);
        async.auto({
            getMovieByTitle: function(callback) {
                Movies.find({
                    where: {
                        movieName: {regexp:  `^${data}`}
                    }
                }, function(err,  Movie) {
                    console.log("err",  err);
                    console.log("Movie",  Movie);
                    if(err) callback(null, err)
                    callback(null, Movie)
                })
            }
        }, function(err,res) {
            if(err) return cb (err)
            cb(null, res)

        })
    }

    Movies.remoteMethod('getMovieTitle', {
        http: {path: '/getMovieTitle', verb: 'get'},
        accepts: {arg: 'name', type: 'string'},
        returns: { arg: 'Movie', type: 'object'}
    })

};
