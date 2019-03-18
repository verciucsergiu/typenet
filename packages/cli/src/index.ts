#!/usr/bin/env node

import chalk from 'chalk';

const init = async () => {
    console.log(chalk.green("Hello world"));
}

const run = async () => {
    init();
}


run();