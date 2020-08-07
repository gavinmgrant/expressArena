const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy double cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Method: ${req.method}
        Protocol: ${req.protocol}
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        IP address: ${req.ip}
        `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); // do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;

    //2. validate the values
    if(!name) {
        //3. name was not provided
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        //3. race was not provided
        return res.status(400).send('Please provide a race');
    }

    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    //6. send the response
    res.send(greeting);
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});