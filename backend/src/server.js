const express = require('express');
const routes = require('./routes')

const db = require('./models/index');

const app = express();

app.use(express.json());
app.use(routes);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}` )
})