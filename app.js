var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jokeFacade = require('./jokeFacade.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// var result=db.jokes.insert(jokes);
// printjson(result);


app.get('/api/joke/random', function (req, res) {
    jokeFacade.randomJoke(function (err, joke) {
        if (err) {
            res.write(err);

        } else {
            res.write(JSON.stringify(joke));
        }
        res.end();
    })

});
app.get('/api/jokes', function (req, res) {
    jokeFacade.allJokes(function (err, jokes) {
        if (err) {
            res.write(err);

        } else {
            res.write(JSON.stringify(jokes));
        }
        res.end();
    })
});
app.post('/api/joke', function (req, res) {
    var jokeIn = req.body;
    jokeFacade.addJoke(jokeIn, function (err, joke) {
        if (err) {
            res.write(err);

        } else {
            res.write(JSON.stringify(joke));
        }
        res.end();
    })
});
app.put('/api/joke', function (req, res) {
    // var jokeIn = req.body;
    jokeFacade.randomJoke(function (err, joke) {
        if (err) {
            res.write(err);

        } else {
            res.write(JSON.stringify(joke));
        }
        res.end();
    })
});
app.delete('/api/joke/:_id', function (req, res) {
    var id = req.params._id;
    jokeFacade.deleteJoke(id, function (err, joke) {
        if (err) {
            res.write(err);

        } else {
            res.write(JSON.stringify(joke));
        }
        res.end();
    })
});


jokeFacade.allJokes(function (err, result) {
    console.log(result.length);
});

app.listen(1337, function () {
    console.log('listening on 1337');
})

module.exports = app;
