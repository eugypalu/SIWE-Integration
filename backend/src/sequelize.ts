import { Sequelize } from 'sequelize';
import { DB_NAME, DB_USERNAME, DB_PASSWORD } from './config';

// Create a new Sequelize instance with our database details
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'db', // the host of the database
  dialect: 'postgres'
});

// Test the connection to our database
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error));

// Sync all defined models to the DB.
sequelize.sync()
  .then(() => console.log('All tables have been created successfully.'))
  .catch(error => console.error('Unable to create tables:', error));

export default sequelize;