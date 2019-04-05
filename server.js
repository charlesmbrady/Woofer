require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const moment = require('moment');
const helmet = require('helmet');
const PORT = process.argv[2] || process.env.PORT || 3333;
const app = express();
const http = require('http');

const server = http.createServer(app);

const db = require('./models');
let userArray = [];
//setup socket.io
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.emit('message', 'hello');
  console.log("SOCKET ID", socket.id);
  userArray.push(socket.id);
  console.log(userArray);
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(morgan('dev')); // Hook up the HTTP logger
app.use(express.static('public'));

require('./config/passport')(db, app, passport); // pass passport for configuration

// Define our routes
app.use('/api', require('./routes/apiRoutes')(passport, db, io));
app.use(require('./routes/htmlRoutes')(db));

// Secure express app
app.use(helmet.hsts({
  maxAge: moment.duration(1, 'years').asMilliseconds()
}));

// catch 404 and forward to error handler
if (app.get('env') !== 'development') {
  app.use((req, res, next) => {
    const err = new Error('Not Found: ' + req.url);
    err.status = 404;
    next(err);
  });
}
//comment

db.sequelize.sync({ force: process.env.FORCE_SYNC === 'true' }).then(() => {
  if (process.env.FORCE_SYNC === 'true') {
    require('./db/seed')(db);
  }

  server.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

