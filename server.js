// model envelope
// {id: 0, name: "", limit: 0}

// TODO: DRY input verification

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');

const PORT = 3000;

let envelopes = [];

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Welcome! Endpoints: GET /envelopes, GET /envelopes/:id, POST /envelopes, PUT /envelopes/:id (to update basic info only), POST /envelopes/spend/:id, POST /envelopes/transfer/:from/:to, DELETE /envelopes/:id');
});

app.get('/envelopes', (req, res, next) => {
    res.send(JSON.stringify(envelopes));
});

app.get('/envelopes/:id', (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const env = helpers.getEnvelopeById(id);
        res.send(JSON.stringify(env));
    } catch (err) {
        err.status = 404;
        next(err);
    }
});

app.post('/envelopes', (req, res, next) => {
    // should be sent {name: "", limit: 0}
    try {
        const newEnvelope = req.body;
        if (newEnvelope.limit < 0 || typeof newEnvelope.limit !== 'number') {
            throw new Error('Must create envelope with balance 0 or greater');
        }
        if (typeof newEnvelope.name !== 'string') {
            throw new Error('Envelope name must be a string');
        }
        const newId = helpers.generateId();
        newEnvelope.id = newId;
        envelopes.push(newEnvelope);
        const env = helpers.getEnvelopeById(newId);
        res.status(201).send(JSON.stringify(env));
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

app.post('/envelopes/spend/:id', (req, res, next) => {
    // should be sent {amount: 0}
    try {
        const id = Number(req.params.id);
        const envToSpendFrom = helpers.getEnvelopeById(id);
        const amount = req.body.amount;
        if (typeof amount !== 'number') {
            throw new Error('Amount to spend must be a number');
        }
        if (amount <= 0) {
            throw new Error('Amount to spend must be greater than 0');
        }
        const newLimit = envToSpendFrom.limit - amount;
        if (newLimit < 0) {
            throw new Error('Amount provided is greater than funds available');
        }
        const envIndex = envelopes.findIndex(env => env.id === id);
        envelopes[envIndex].limit = newLimit;
        res.status(201).send(envelopes[envIndex]);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

app.post('/envelopes/transfer/:fromId/:toId', (req, res, next) => {
    // should be sent {amount: 0}
    try {
        const fromEnv = helpers.getEnvelopeById(req.params.fromId);
        const toEnv = helpers.getEnvelopeById(req.params.toId);
        const amount = req.body.amount;
        if (typeof amount !== 'number') {
            throw new Error('Amount to transfer must be a number');
        }
        if (amount <= 0) {
            throw new Error('Amount to transfer must be greater than 0');
        }
        if (amount > fromEnv.limit) {
            throw new Error('Amount provided is greater than funds available');
        }
        const fromIndex = envelopes.findIndex(env => env.id === fromEnv.id);
        const toIndex = envelopes.findIndex(env => env.id === toEnv.id);
        envelopes[fromIndex].limit -= amount;
        envelopes[toIndex].limit += amount;
        res.status(201).send([envelopes[fromIndex], envelopes[toIndex]]);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

app.put('/envelopes/:id', (req, res, next) => {
    try {
        const name = req.body.name;
        const limit = req.body.limit;
        if (typeof name !== 'string')
        {
            throw new Error('Name must be a string');
        }
        if (typeof limit !== 'number' || limit < 0) {
            throw new Error('Limit must be a number 0 or greater');
        }
        const envIndex = envelopes.findIndex(env => env.id === Number(req.params.id));
        if (envIndex === -1) {
            throw new Error('Envelope not found');
        }
        envelopes[envIndex].name = name;
        envelopes[envIndex].limit = limit;
        res.send(envelopes[envIndex]);
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

app.delete('/envelopes/:id', (req, res, next) => {
    try {
        const idToDelete = Number(req.params.id);
        const envToDelete = helpers.getEnvelopeById(idToDelete);
        envelopes = envelopes.filter(env => env.id !== idToDelete);
        res.status(204).send();
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});