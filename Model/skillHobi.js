const mongoose = require('mongoose');

const skillHobi = mongoose.model(
    'SkillHobi',
    new mongoose.Schema({
        skill: { type: Array, default: ['Surpac', 'Whittel', 'Micromine', 'Web Developer (JavaScript)'] },
        hobi: { type: Array, default: ['Chess', 'Badminton'] },
        createdAt: { type: 'string', default: '' },
        updatedAt: { type: 'string', default: '' },
    }),
);

module.exports = skillHobi;
