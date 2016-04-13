'use strict';
var braintree = require('braintree');
var message = require('./models/messages');
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '2cdqxfc9dxtxrwrc',
    publicKey:    '79zqb2p3588drqbw',
    privateKey:   '70ae751bf500c2cee91294d5dc9b1af2'
});

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
		app.get("/client_token", function (req, res) {
		  gateway.clientToken.generate({}, function (err, response) {
		    res.send(response.clientToken);
		  });
		});

		app.post("/checkout", function (req, res) {
		  var nonce = req.body.payment_method_nonce;
		  var nonce = braintree.Test.Nonces.Transactable //testing
		  console.log(braintree.Test.Nonces.Transactable);
		  // Use payment method nonce here
		  console.log(nonce);
		  gateway.transaction.sale({
			  amount: '10.00',
			  paymentMethodNonce: nonce,
			  options: {
			    submitForSettlement: true
			  }
			}, function (err, result) {
				res.sendfile('./public/index.html');
				//res.status(300).send({redirect:"/messages"});
			});
		});
		app.post('/payment', function(req, res){
			console.log(res.body);
		});

		// frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
	};