require('dotenv').config({path: './.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphQLSchema = require('./graphql/schema');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
graphQLSchema.applyMiddleware({app});

app.listen(process.env.PORT, () => {
    console.log(`SERVER START IN PORT: ${process.env.PORT}`)
})
