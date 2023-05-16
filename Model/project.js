const mongoose = require('mongoose');

const project = mongoose.model(
    'Projects',
    new mongoose.Schema({
        data: [
            {
                name: {
                    type: 'string',
                    required: true,
                    default: 'project1',
                },
                image_url: {
                    type: 'string',
                    required: true,
                    default: 'url project1',
                },
                url: {
                    type: 'string',
                    required: true,
                    default: 'link url project1',
                },
                createdAt: {
                    type: 'string',
                    default: '',
                },
                updatedAt: {
                    type: 'string',
                    default: '',
                },
            },
        ],
        createdAt: {
            type: 'string',
            default: '',
        },
    }),
);

module.exports = project;
