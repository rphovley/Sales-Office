The following project was collaborated on by Alex Vance and Paul Hovley

URL
	Next-Big-Things.com

Frameworks used:
	MEAN stack
	MDB styling (bootstrap with material design)
	Parse Server

Server
	Hosted on Azure 

File Structure
	app:  contains server side code (node, mongodb)
		models: contains any models used for the project
		routes.js: defines the routes to be used on the server side
	config: contains db file to configure database connection
	node-modules: contains modules for node server
	public: contains client side code (angular, ember)
		bower_componenents: contains client side libraries like angular
		css: contains styling for website
		img: contains images for website
		js:  contains logic for angular controllers, services, routers etc...
			controllers:  all code for controllers is here
			services:  all code for services is here
			app.js:  app specific configurations.  specifically connects/injects the controllers for angular
			appRoutes.js: client side routing for angular views and controllers
		libs: any additional libraries not served by bower (mdb is a private repository)
		views: views for different website pages
		index.html: main templating page
		login.html: main login page
	bower.json:  bower_components are installed from this file
	package.json: node_moduls are installed from this file
	server.js:  node server is initiated through this file

Instructions
	After unzipping file run the following command (requires node installation on server)
		node server
	this will launch the server to listen on port 80.  You can configure the port in server.js


Overview: 
	This website is a starting point for a music sharing website.  A user can register/login to the website.
	The users will be able to view other peoples content, messages, and edit their own profiles.
	

