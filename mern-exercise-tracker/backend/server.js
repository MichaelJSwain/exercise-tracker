const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware - allows server to parse JSON requests / responses
app.use(cors());
app.use(express.json());


mongoose.set('useUnifiedTopology', true);
// connect to uri (where database is stored), to start connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// once the connection is open / connected to DB
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// import and use route files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
// e.g if someone goes to exercises route,
// it will load everything in the exercisesRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//  start server / listen to a port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

