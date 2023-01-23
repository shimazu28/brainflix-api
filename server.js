const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const videosRoute = require('./routes/videos')
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5050;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN}));

app.use('/videos', videosRoute, express.static('public'));



app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})