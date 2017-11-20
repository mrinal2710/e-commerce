var express = require('express');
var path = require('path');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
const expressValidator = require('express-validator');


// Init app
var app = express();
var mongoose = require('mongoose');


//Connect to database
mongoose.connect('mongodb://localhost/ecommerceData');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB')
});


//View Engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Set public folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

//express-validator
app.use(expressValidator({
    errorFormatter (param, msg, value, location){
        var namespace = param.split('.')
        ,root = namespace.shift()
        ,formParam = root;

while(namespace.length){
    formParam += '[' + namespace.shift() + ']';
}
return{
    param: formParam,
    msg:msg,
    value:value
};
    }
}));  

//Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Set routes
var pages = require('./routes/pages.js');
var adminPages = require('./routes/adminPages.js');

app.use('/admin/pages', adminPages);
app.use('/',pages);

//Start the Server
app.listen(port,()=>{
    console.log(`Server is up on the port ${port}`)
 });