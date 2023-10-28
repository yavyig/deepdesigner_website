const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const dotenv = require('dotenv');

dotenv.config({ path: "./config/keys.env" });


// Register handlebars as the rendering engine for views
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');

//register 'eq' custom handlebars method
handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

// define a custom Handlebars helper
handlebars.registerHelper('ifGreaterThanZero', function (quantity, options) {
    if (quantity > 0) {
        // if the quantity is greater than 0, render the content within the block
        return options.fn(this);
    } else {
        // if the quantity is 0 or less, skip the content within the block
        return options.inverse(this);
    }
});

//Setup a static resource folder. 
app.use(express.static("public"));


// Add your routes here
// e.g. app.get() { ... }

//body parser
app.use(express.urlencoded({ extended: false }));

//controller
const generalController = require('./controllers/generalController');
app.use('/', generalController);

const projectController = require('./controllers/projectController');
app.use('/projects/', projectController);


// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);