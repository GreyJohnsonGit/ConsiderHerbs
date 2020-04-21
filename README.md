## Getting Started
This repository contains the code for the ConsiderHerbs website, but does not include the database information or setup (the connection to your database can be made using the [config.js](server/config/config.js)


## Available Scripts

### `npm run-script dev`
Runs the server and client side of the application.

### `npm run-script client`
Runs the client side of the application.

### `npm run-script server`
Runs the server side of the application.

### `npm run build`
Produces an optimized version of the application for deployment.

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
    - #### `config.js` - Defines constants for server and facebook connection
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration file for mongodb and google credentials
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
- #### `AuthenticationTools.js` - Authentication tools to manage user sessions and login
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
