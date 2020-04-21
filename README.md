## Getting Started
This repository contains the code for the ConsiderHerbs website, but does not include the database information or setup (the connection to your database can be made using the [config.js](server/config/config.js)

## API's used
This repository uses the facebook and google api's for login and signup. MongoDB is used to host the database. Finally, Stripe is used to manage payments for the site. If our project is chosen then we can add the client to the google console project that manages our google login API and handover ownership of it. The same goes for the Facebook API.
The Facebook API ke can be located in client/src/config.js at line 1.
It would not need to be changed, however the Facebook exports.address at line 2 of the same file would need to be updated to the new url of the wwebsite depending on where it is hosted.
The Google API key can be found in the server/config/credentials.js at line 1.
The redirect link here would need to be updated to the new url of the site.



## Features
#### Home Page
The home page contains an interactive list of herbal recipes. This list can be narrowed by searching or by clicking on an adjacent body diagram. These recipes detail the ingredients and the method of use.

#### Forum Page
The forum page contains the user discussions within threads. A user can see important threads, search for specific threads and click on threads to read, comment, and like. In addition, the Did You Know threads are available for specially selected topics.

#### Glossary Page
The glossary page contains a comprehensive list of important terms on the site. This list can be searched using terms, alphabet, or through scrolling.

#### About Page
The about page contains the site’s goal as presented for the world to see.

#### Schedule Page
The schedule page contains an interactive calendar which allows for users to sign up for meetings, classes, and personal consultations.

#### Products Page
The products page contains a list of products for Users to view and purchase. These products can be searched by name and are separated by whether they are ConsiderHerb, Affiliate, or Suggested. A user can click on the product to see it’s external page.

#### Sign In Page
The sign in page allows users to sign in and sign up using their information, google, or facebook.

#### Profile Page
The profile page allows users to change their password, see their forum posts, and manage their subscription. The owner can also manage user permissions from here.

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
