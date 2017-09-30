import mongoose from 'mongoose';
import { CONNECTION_STRING, MONGOOSE_OPTIONS } from '../config/database';

export default {
  connect: function connectDatabase(uri) {
    return new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise;
      mongoose.connect(CONNECTION_STRING, MONGOOSE_OPTIONS);
      mongoose.connection
        .on('error', error => {
          console.error(`Unable to connect to database ${CONNECTION_STRING}`);
          console.error(`Error: ${error}`);
          reject(error);
        })
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => {
          console.log(`Connected to database ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
          resolve(mongoose.connections[0]);
        });
    });
  }
};
