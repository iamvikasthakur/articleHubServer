const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9000;
const upload = require('./handlers/multer');
require('dotenv').config();
require('./handlers/mongodb');
require('./handlers/multer');
require('./handlers/cloudinary');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('*', express.static(path.join(__dirname, "client", "build")))

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

const home = require('./routes/home');
const economical = require('./routes/economical');
const technical = require('./routes/technical');
const sport = require('./routes/sport');
const science = require('./routes/science');
const write = require('./routes/write');
const authenticate = require('./routes/authenticate');
const user = require('./routes/user');

app.use('/', home);
app.use('/economical', economical);
app.use('/technical', technical);
app.use('/sport', sport);
app.use('/science', science);
app.use('/write', write);
app.use('/authenticate', authenticate);
app.use('/user', user);

app.get('*', (req, res) => {
  res.send('Page Not Found');
})


if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})