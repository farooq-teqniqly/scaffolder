#! /usr/bin/env node

const app = require('caporal');

app
    .version('1.0.0')
    .command('create', 'Create a new application.')
    .argument('<template>', 'The template to use.')
    .option('--variant <variant>', 'The template <variant> to create.')
    .action((args, options) => {
        console.log({
            args,
            options
        });
    });

app.parse(process.argv);