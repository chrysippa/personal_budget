// model envelope
// {id: 0, name: "", limit: 0}

// TODO: add error handling, move helper funcs to other file

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

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/envelopes', (req, res) => {
    res.send(JSON.stringify(envelopes));
});

app.post('/envelopes', (req, res) => {
    // should be sent {name: "", limit: 0}
    const newEnvelope = req.body;
    const newId = generateId();
    newEnvelope.id = newId;
    envelopes.push(newEnvelope);
    console.log(`envelope id is ${newEnvelope.id}. current envelopes:`);
    envelopes.forEach(e => console.log(e));
    const env = getEnvelopeById(newId);
    res.status(201).send(JSON.stringify(env));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});