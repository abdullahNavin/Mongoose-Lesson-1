const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')


const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

//mongoose connection
mongoose.connect(`mongodb+srv://MainAdminForAll:kGhPVQA0bQVZxDJ4@simple-crud.ce5cqwx.mongodb.net/?retryWrites=true&w=majority&appName=Simple-crud`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));



//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message || err });
}

//routes
app.use('/todo', todoHandler)

app.get('/', (req, res) => {
    res.send('server is running')
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})