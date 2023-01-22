const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const videosRoute = require('./routes/videos')
const commentsRoute = require('./routes/comments') 

const PORT = process.env.PORT || 5050;

app.use (cors());

app.use('/', videosRoute)
app.use('/', commentsRoute)

app.use(express.json());
app.use(express.static('public'));

app.listen(POST, () => {
    console.log("Server is running on port", PORT);
})