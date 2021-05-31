/**
 * @file This is the main application configuration file. It reads environment variables using the
 * DotEnv Package @see {@link https://www.npmjs.com/package/dotenv} and exports the configuration as a module.
 * @author Gabriel <gabrielsonchia@gmail.com> <30/05/2021 12:37pm>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <30/05/2021 04:12pm>
 */


const dotenv = require('dotenv');
const bunyan = require('bunyan');

const APP_NAME = 'BackendCodingTest';

// load env configuration as early as possible
dotenv.config();

const { PORT = 5000, NODE_ENV = 'development' } = process.env;
// export configuration
module.exports = {
  applicationName: APP_NAME,
  port: PORT,
  logger: bunyan.createLogger({
    name: APP_NAME,
    serializers: { err: bunyan.stdSerializers.err },
    src: true,
    streams: [
      {
        level: 'info',
        stream: process.stdout, // log INFO and above to stdout
      },
    ],
  }),
  production: NODE_ENV === 'production',
};
