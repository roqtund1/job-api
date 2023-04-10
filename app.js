require('dotenv').config();
require('express-async-errors');

// extra security package
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

const authenticateUser = require('./middleware/authentication')

// routes
const auth = require('./routes/auth')
const jobs = require('./routes/jobs')

// error handler ---
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const { BadRequest } = require('./errors');


//middleware
app.use(express.static('./public'));
app.use(express.json())


// security packages
app.set('trust proxy', 1);
app.use(rateLimit({
    windowMs: 60 * 100,
    max: 60
}))
app.use(helmet());
app.use(cors());
app.use(xss())

app.get('/', (req, res)=>{

    res.send('<h1>Job API</h1><a href="/api-docs">Documentation</a>')
})


// routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/jobs', authenticateUser, jobs);

// error handler
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 4000;

const start = async ()=> {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, ()=> console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log('Could not connect to MongoDB', error.message);
    }
}

start();