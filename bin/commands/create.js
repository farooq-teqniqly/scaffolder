const prompt = require('prompt');
const shell = require('shelljs');
const fs = require('fs');
const colors = require("colors/safe");

module.exports = (args, options, logger) => {
    const variant = options.variant || 'default';
    const templatePath = `${__dirname}/../../templates/${args.template}/${variant}`;
    const localPath = process.cwd();

    if (!fs.existsSync(templatePath)) {
        logger.error(`The template for '${args.template}' was not found.`);
        process.exit(1);
    }

    shell.cp('-R', `${templatePath}/*`, localPath);
    logger.info(`Files for template '${args.template}' copied.`);

    const variables = require(`${templatePath}/_variables`);

    if (fs.existsSync(`${localPath}/_variables.js`)) {
        shell.rm(`${localPath}/_variables.js`);
    }

    prompt.start().get(variables, (err, result) => {
        shell.ls('-Rl', '.', ).forEach(entry => {
            if (entry.isFile()) {
                variables.forEach(variable => {
                    shell.sed('-i', `\\[${variable.toUpperCase()}\\]`, result[variable], entry.name);
                });
            }
        });

        logger.info('Done.');
    });
}