/* eslint-disable no-console */
const inquirer = require('inquirer');
const { resolve } = require('path');
const { spawn } = require('child_process');

function defaults() {
  process.env.APP_INTERFACE = 'false';
  process.env.DEBUG = 'false';
}

function usage() {
  console.log(
    [
      'Use this script to create a PR, merging stage and prod branches first.',
      'Run again to create an MR, deploying app-interface with the latest SHA refs from the same branches.',
      'Branch PRs are created in the koku-ui repo and MRs will be created in your app-interface fork.\n',
    ].join('\n')
  );
}

async function setAppInterfaceConfig() {
  const { appInterfaceEnv } = await inquirer.prompt([
    {
      name: 'appInterfaceEnv',
      message: 'Are you deploying to app-interface?',
      type: 'confirm',
      default: false,
    },
  ]);
  process.env.APP_INTERFACE = appInterfaceEnv.toString();
}

async function setConfig() {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'clouddotEnv',
        message: 'Which Chrome environment do you want to release?',
        choices: process.env.APP_INTERFACE === 'true' ? ['prod', 'all'] : ['prod'], // Todo: Support for stage branch?
      },
      {
        name: 'debug',
        message: 'Do you want to debug?',
        type: 'confirm',
        default: false,
      },
    ])
    .then(answers => {
      const { clouddotEnv, debug } = answers;
      process.env.DEBUG = debug.toString();

      const isProd = clouddotEnv === 'prod' || clouddotEnv === 'all';

      if (isProd) {
        process.env.PROD_ARG = '-p';
      }
    });
}

async function run() {
  defaults();
  usage();

  await setAppInterfaceConfig();
  await setConfig();

  const allArgs = [];
  if (process.env.DEBUG === 'true') {
    allArgs.push('-x');
  }

  allArgs.push(process.env.APP_INTERFACE === 'true' ? 'release-app-interface.sh' : 'release-branch.sh');

  const argVars = ['PROD_ARG'];
  const deploymentArgs = argVars.map(v => process.env[v]).filter(Boolean);
  allArgs.push(...deploymentArgs);

  spawn('sh', allArgs, {
    stdio: 'inherit',
    cwd: resolve(__dirname, '.'),
  });
}

try {
  run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
