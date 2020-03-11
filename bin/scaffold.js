#! /usr/bin/env node

const app = require('caporal');
const createCommand = require('./commands/create');

app
    .version('1.0.0')
    .command('create', 'Create a new application.')
    .argument('<template>', 'The template to use.')
    .option('--variant <variant>', 'The template <variant> to create.')
    .action(createCommand);

app.parse(process.argv);