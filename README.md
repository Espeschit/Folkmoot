![Screenshot](https://raw.githubusercontent.com/Espeschit/Folkmoot/main/frontend/public/screenshot.png)

# Folkmoot

A Real Time Chat Application built using React, Express, Mongoose & Socket.io.

## Index
+ [Features](#features)
+ [Installation](#installation)
+ [How It Works](#how-it-works)

## Features<a name="features"></a>
+ Uses React & Express as the application Frameworks.
+ Passwords are hashed using [bcrypt-nodejs](https://github.com/shaneGirish/bcrypt-nodejs) package.
+ Real-time communication between a client and a server using [Socket.io](https://github.com/socketio/socket.io).
+ Uses [MongoDB](https://github.com/mongodb/mongo) & [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.
+ Words filtered using [bad-words](https://github.com/web-mech/badwords) package.
+ Uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) to securely transmit information between parties .

## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/Espeschit/Folkmoot.git
	$ cd Folkmoot
	```
2. Install Dependencies

	```
	$ npm i
	```
2. Create .env file in backend with your credentials(see [Setup Configurations](#configurations)).

3. Start the application

	```
	$ cd frontend && cd backend npm start
	```
Your app should now be running on [localhost:3000](http://localhost:3000/).

## How It Works<a name="how-it-works"></a>
### Setup Configurations<a name="configurations"></a>
The environment variables need to be created with your credentials, containing the backend port, the mongodb cluster url and the password the JWT token.

#### MongoDB
You need to create a MongoDB cluster, get the `MongoDB URI` and assign it to the .env file in the backend.

### Database<a name="database"></a>
Mongoose is used to interact with a MongoDB cluster. 

#### Schemas
There is only one schema; users. 

Each user has a username, passwordHash, and email.

### Models<a name="models"></a>
The user model wraps Mongoose Model object, overrides and provides some methods.

### Session<a name="session"></a>
Session data are stored locally on your computer. It will be deleted upon logging out.

### User Authentication<a name="auth"></a>
User can signup using the email, password and username. The password entered is encrypted with 10 salt rounds and it's hashed. Then the hash is saved in the database.

User can login using the email and password. User authentication is done by hashing the password entered in the Login page and comparing with the hash in the database and the JWT token is signed with the user credentials and the SECRET_KEY in the .env file.

### Sockets<a name="sockets"></a>
Having an active connection opened between the client and the server so client can send and receive data. This allows real-time communication using TCP sockets. This is made possible by [Socket.io](https://github.com/socketio/socket.io).

The client starts by connecting to the server through a socket. Once connections is successful, client and server can emit and listen to events. 
