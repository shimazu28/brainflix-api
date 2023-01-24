const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const videosRoute = require('./routes/videos')


const PORT = process.env.PORT || 5050;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN}));
app.use(express.json());
app.use(express.static('public'));

app.use('/videos', videosRoute);





app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})