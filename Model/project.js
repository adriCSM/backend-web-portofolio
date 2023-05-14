const mongoose = require('mongoose');

const project = mongoose.model(
    'project',
    new mongoose.Schema({
        nama: {
            type: 'string',
            required: true,
        },
        image_url: {
            type: 'string',
            required: true,
        },
        url: {
            type: 'string',
            required: true,
        },
    }),
);

module.exports = project;
