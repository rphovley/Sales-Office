'use strict';
var braintree = require('braintree');


	module.exports = function(app){

		// server routes ===========================================================
		// handle things like api calls	
		//get messages from database database
		app.get('/api/messages', function(req, res){
			console.log("api/messages and get");
			message.find(function(err, messages){
				if(err){
					res.send(err);
					res.json(messages);
				}
				else{
					res.json(messages);
				}	
			});
		});
		//create new message in database
		app.post('/api/messages', function(req, res){
			console.log("api/messages and post");
			console.log(req.body.content);
			console.log(req.body.from);
			console.log(req.body);

			message.create({
				content : req.body.content,
				from : req.body.from
			}, function(err, messages){
				if (err){
					res.send(err);
				}
				else{
					message.find(function(err, messages){
						if(err){
							res.send(err);
							res.json(messages);
						}
						else{
							res.json(messages);
						}	
					});
				}

			});
		});
		//delete message from database
		app.delete('/api/messages/:message_id', function(req, res){
			message.remove({
				_id : req.params.message_id
			}, function (err, messages){
				if (err){
					res.send(err);
				}
				else{
					message.find(function(err, messages){
						if(err){
							res.send(err);
							res.json(messages);
						}
						else{
							res.json(messages);
						}	
					});
				}
			});
		});

		// BRAINTREE ROUTE ==========================================================
		app.post('/payment', function(req, res){
			console.log(res.body);
		});

		// frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
	};