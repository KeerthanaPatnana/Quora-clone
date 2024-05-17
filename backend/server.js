const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 80;
const db = require('./db');
const router = require('./routes');

//Database connection
db.connect();

//middle ware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//cors 
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    next();
})

//routes
app.use('/api', router);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

// Serve static files from the 'frontend/build' directory under the 'uploads' path
app.use(express.static(path.join(__dirname, '/../frontend/build')));

//catch-all route
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
    } catch (error) {
        res.send("Oops! Something went wrong!")
    }
});

app.use(cors());

//server listening
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});