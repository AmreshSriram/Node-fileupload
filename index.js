const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const uploadRoute = require('./route/upload');

global.__basedir = __dirname;


mongoose.connect('mongo_db_uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});


app.use(
    session({
        secret: 'chrishemsworth',
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: 'mongo_db_uri'
  })
}));

	
const { application } = require('express');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false}));

app.use(uploadRoute);
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server is running successfully on PORT ${PORT}`);
});













