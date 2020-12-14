"use strict";

/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var processFormBody = multer({storage: multer.memoryStorage()}).single('uploadedphoto');
var fs = require("fs");

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
//var cs142models = require('./modelData/photoApp.js').cs142models;

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get('/test/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    console.log('/test called with param1 = ', request.params.p1);

    var param = request.params.p1 || 'info';

    if (param === 'info') {
        // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                // Query didn't return an error but didn't find the SchemaInfo object - This
                // is also an internal error return.
                response.status(500).send('Missing SchemaInfo');
                return;
            }

            // We got the object - return it in JSON format.
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } else if (param === 'counts') {
        // In order to return the counts of all the collections we need to do an async
        // call to each collections. That is tricky to do so we use the async package
        // do the work.  We put the collections into array and use async.each to
        // do each .count() query.
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});

/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(401).send("user is not logged in");
        return;
    }
    User.find({}, "id first_name last_name", function (err, userList) {
        if (err) {
            console.error('Doing /user/list error:', err);
            response.status(500).send(JSON.stringify(err));
            return;
        }
        if (userList.length === 0) {
            response.status(500).send('Missing UserList');
            return;
        }
        //console.log('UserList', userList);
        response.status(200).send(JSON.stringify(userList));
    });
});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(401).send("user is not logged in");
        return;
    }
    var id = request.params.id;
    User.findOne({_id: id}, "id first_name last_name location description occupation", function (err, user) {
        if (err) {
            console.error('Doing /user/:id error:', err);
            response.status(400).send(JSON.stringify(err));
            return;
        }
        if (Object.entries(user).length === 0) {
            response.status(400).send('Missing User');
            return;
        }

        //console.log('User', user);
        response.status(200).send(JSON.stringify(user));
    });
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get('/photosOfUser/:id', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(401).send("user is not logged in");
        return;
    }
    var id = request.params.id;
    Photo.find({user_id: id}, "_id user_id comments file_name date_time", function (err, photos) {
        if (err) {
            console.error('Doing /photoOfUser/:id error:', err);
            response.status(400).send(JSON.stringify(err));
            return;
        }
        if (photos.length === 0) {
            response.status(400).send('Missing PhotoOfUser');
            return;
        }
        photos = JSON.parse(JSON.stringify(photos));
        async.each(photos, function(photo, callbackPhoto) {
            async.each(photo.comments, function(comment, callbackComment) {
                User.findById(comment.user_id, 'first_name last_name _id', function(err, user) {
                    comment.user = user;
                    callbackComment();
                });
            }, function(err){
                if(err) {
                    console.log("error in photos=>user");
                    callbackPhoto(err);
                } else {
                    callbackPhoto();
                }
            });
        }, function(err) {
            if (err) {
                console.log("UserList async error ", err);
                response.status(400).send(JSON.stringify(err));
            } else {
                response.status(200).send(JSON.stringify(photos));
            }
        });
    });
});

app.post('/admin/login', function (request, response) {
    var login_name = request.body.login_name;
    User.find({login_name: login_name}, function (err, info) {
        if (err) {
            console.error('Doing /admin/login error:', err);
            response.status(400).send(JSON.stringify(err));
            return;
        }
        if ( info === undefine||dinfo === null ) {
            response.status(400).send('Wrong login name');
            return;
        }
        request.session.user_id = info._id;
        response.status(200).send({_id: info.id});
    });
});

app.post('/admin/logout', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(400).send('user is not currently logged in');
    } else {
        request.session.destroy(function(err){console.log("log out")});
    }
});

app.post('/commentOfPhoto/:photo_id', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(401).send('user is not currently logged in');
    } else if(request.body.comment === undefined||request.body.comment === null) {
        response.status(400).send('comment is null');
    }

    var date = new Date().toISOString();
    var newComment = {
        comment: request.body.comment,
        user_id: request.session.user_id,
        date_time: date,
    };

    Photo.findById(request.params.photo_id, function(err, photo) {
        if (err) {
            console.error('Doing /photoOfUser/:id error:', err);
            response.status(400).send(JSON.stringify(err));
            return;
        }
        if (photos.length === 0) {
            response.status(400).send('Missing PhotoOfUser');
            return;
        }
        photo.comments.push(newComment);
        Photo.findByIdAndUpdate(request.params.photo_id, {comments: photo.comments});
    });
});

app.post('/photo/new', function (request, response) {
    if (request.session.user_id === undefined || request.session.user_id === null) {
        response.status(401).send('user is not currently logged in');
    }

    processFormBody(request, response, function (err) {
        if (err || !request.file) {
            // XXX - Insert error handling code here.
            response.status(400).send('no file uploaded');
            return;
        }
        // request.file has the following properties of interest
        // fieldname - Should be 'uploadedphoto' since that is what we sent
        // originalname: - The name of the file the user uploaded
        // mimetype: - The mimetype of the image (e.g. 'image/jpeg', 'image/png')
        // buffer: - A node Buffer containing the contents of the file
        // size: - The size of the file in bytes

        // XXX - Do some validation here.
        // We need to create the file in the directory "images" under an unique name. We make
        // the original file name unique by adding a unique prefix with a timestamp.
        var timestamp = new Date().valueOf();
        var filename = 'U' + String(timestamp) + request.file.originalname;
        fs.writeFile("./images/" + filename, request.file.buffer, function (err) {
            // XXX - Once you have the file written into your images directory under the name
            // filename you can create the Photo object in the database
            if (err) {
                response.status(400).send('writ file error');
                return ;
            }
            var date_time = new Date().toISOString();
            var photo = {
                user_id: request.session.user_id,
                file_name: filename,
                date_time: date_time,
                comments: [],
            }
            Photo.create(photo, function(err) {
                if (err) {
                    response.status(400).send('writ file info to database error');
                    return;
                }
                response.status(200).send({user_id: request.session.user_id});
            });
        });
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


