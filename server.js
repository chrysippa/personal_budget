// model envelope
// {id: 0, name: "", limit: 0}

// TODO: move helper funcs to other file

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

let idIncrementor = 0;
const generateId = () => {
    idIncrementor++;
    return idIncrementor;
};

const getEnvelopeById = (id) => {
    const foundEnvelope = envelopes.find(e => e.id === id);
    if (foundEnvelope) {
        return foundEnvelope;
    } else {
        throw new Error("Envelope not found");
    }
};

const envelopes = [];
let totalFunds = 0;

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Welcome! Endpoints: GET /envelopes, GET /envelopes/:id, POST /envelopes, PUT /envelopes/:id, POST /envelopes/transfer/:from/:to, DELETE /envelopes/:id');
});

app.get('/envelopes', (req, res, next) => {
    res.send(JSON.stringify(envelopes));
});

app.get('/envelopes/:id', (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const env = getEnvelopeById(id);
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
        const newId = generateId();
        newEnvelope.id = newId;
        envelopes.push(newEnvelope);
        const env = getEnvelopeById(newId);
        res.status(201).send(JSON.stringify(env));
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