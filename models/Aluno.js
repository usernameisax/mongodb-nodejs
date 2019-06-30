var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlunoSchema = new Schema({
    'Data': {
        type: String,
    },
    'School': {
        type: String,
    },
    'Sex': {
        type: String,
    },
    'Age': {
        type: Number,
    },
    'Traveltime': {
        type: Number,
    },
    'Studytime': {
        type: Number,
    },
    'Failures': {
        type: Number,
    },
    'Famrel': {
        type: Number
    }
});

module.exports = mongoose.models.Aluno || mongoose.model('Aluno', AlunoSchema);