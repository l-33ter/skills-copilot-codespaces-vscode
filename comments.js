// Create web server

// Require modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create web server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    var filename = "." + pathname;

    // Get comments from file
    if (filename == './getComments') {
        fs.readFile('comments.json', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
            res.end();
        });
    }

    // Post comments to file
    else if (filename == './postComment') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var comment = qs.parse(body);
            fs.readFile('comments.json', function (err, data) {
                if (err) throw err;
                var comments = JSON.parse(data);
                comments.push(comment);
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end();
                });
            });
        });
    }

    // Return index.html
    else {
        fs.readFile('index.html', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
}).listen(8080);