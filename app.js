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

// Example of a route handler function that responds with request details
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

// Example of a simple function returning the query object (http...key=query) 
app.get('/queryViewer', (req, res) => {
    console.log(req.query); // returns query to console
    res.end(); // do not send any data back to the client
});

// Example of a route handler with query properties
app.get('/greetings', (req, res) => {
    // 1. get values from the request
    const name = req.query.name;
    const race = req.query.race;

    // 2. validate the values
    if(!name) {
        // 3. name was not provided
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        // 3. race was not provided
        return res.status(400).send('Please provide a race');
    }

    // 4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    // 6. send the response
    res.send(greeting);
});

// Drill 1
app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    if(!a || !b) {
        return res.status(400).send('Please provide two values to add together.');
    }

    const c = parseInt(a,10) + parseInt(b,10);
    const result = `The sum of ${a} and ${b} is ${c}.`;
    res.send(result);
});

// Drill 2
app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;

    if(!text) {
        return res
            .status(400)
            .send('Please provide both text to encrypt.');
    }

    if(!shift) {
        return res
            .status(400)
            .send('Please provide a number to shift.');
    }

    const numShift = parseFloat(shift);

    if(Number.isNaN(numShift)) {
        return res
            .status(400)
            .send('Shift must be a number.');
    }

    const base = 'A'.charCodeAt(0); // get char code

    const cipher = text
        .toUpperCase()
        .split('') // creates an array of letter characters
        .map(char => { // map each original char to a converted char
            const code = char.charCodeAt(0); // get the char code

            // if it is not one of the 26 letters ignore it
            if(code < base || code > (base + 26)) {
                return char;
            }

            // otherwise convert it and get the distance from A
            let diff = code - base;
            diff = diff + numShift;

            // in case the shift takes the value past Z, cycle back to the beginning
            diff = diff % 26;

            // convert back to a character
            const shiftedChar = String.fromCharCode(base + diff);
            return shiftedChar;
        })
        .join(''); // construct a string from the array

    // return the response
    res.status(200).send(cipher);

});

// Drill 3
app.get('/lotto', (req, res) => {
    const arr = req.query.arr;

    // validate there are exactly 6 numbers
    if (arr.length != 6) {
        return res
            .status(400)
            .send('Please enter exactly 6 numbers.');
    }

    // validate the numbers are between 1 and 20
    for (i = 0; i < arr.length; i++) {
        if (arr[i] < 1 || arr[i] > 20) {
            return res
                .status(400)
                .send('Numbers must be between 1 and 20.');
        }
    }

    // create a random array of 6 winning numbers
    const winArrLength = 6;
    const winArr = Array
        .from(Array(winArrLength))
        .map(x => Math.floor(Math.random() * 21));

    // compare the two arrays and determine how many number match
    const matches = arr.filter(element => winArr.includes(element));

    // declare final response
    let finalResponse;
    
    // return the results based on the number of matches
    if (matches.length === 4) {
        finalResponse = 'Congratulations, you win a free ticket!';
    } else if (matches.length === 5) {
        finalResponse = 'Congratulations! You win $100!';
    } else if (matches.length === 6) {
        finalResponse = 'Wow! Unbelievable! You could have won the mega millions!';
    } else {
        finalResponse = 'Sorry, you lose.';
    }

    // final response
    res.send(finalResponse);
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});