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

module.exports.generateId = generateId;
module.exports.getEnvelopeById = getEnvelopeById;